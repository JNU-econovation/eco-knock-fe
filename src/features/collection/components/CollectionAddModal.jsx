import {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  normalizeCollectionUrl,
  resolveFaviconUrl,
} from '../utils/collectionLink';
import './CollectionAddModal.css';

const CollectionAddModal = ({ onAdd, onCancel }) => {
  const titleId = useId();
  const backdropRef = useRef(null);
  const nameInputRef = useRef(null);
  const [name, setName] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [faviconResolution, setFaviconResolution] = useState({
    url: null,
    logo: null,
  });
  const normalizedUrl = useMemo(() => normalizeCollectionUrl(urlInput), [urlInput]);
  const hasResolvedFavicon = faviconResolution.url === normalizedUrl;
  const resolvedFaviconUrl = hasResolvedFavicon ? faviconResolution.logo : null;
  const isFaviconResolving = Boolean(normalizedUrl && !hasResolvedFavicon);
  const canSubmit = Boolean(name.trim() && normalizedUrl && !isFaviconResolving);

  useEffect(() => {
    nameInputRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCancel]);

  useLayoutEffect(() => {
    const backdrop = backdropRef.current;
    const scrollContainer = document.querySelector('.app-layout__main');

    if (!backdrop || !scrollContainer) return undefined;

    const alignToContentCenter = () => {
      const containerRect = scrollContainer.getBoundingClientRect();
      const contentCenter = containerRect.left + scrollContainer.clientWidth / 2;

      backdrop.style.setProperty('--collection-add-modal-center-x', `${contentCenter}px`);
    };

    alignToContentCenter();

    const resizeObserver = new ResizeObserver(alignToContentCenter);
    resizeObserver.observe(scrollContainer);
    window.addEventListener('resize', alignToContentCenter);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', alignToContentCenter);
    };
  }, []);

  useEffect(() => {
    let isCancelled = false;

    if (!normalizedUrl) return undefined;

    resolveFaviconUrl(normalizedUrl).then((faviconUrl) => {
      if (isCancelled) return;

      setFaviconResolution({
        url: normalizedUrl,
        logo: faviconUrl,
      });
    });

    return () => {
      isCancelled = true;
    };
  }, [normalizedUrl]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!canSubmit) return;

    onAdd({
      name: name.trim(),
      url: normalizedUrl,
      logo: resolvedFaviconUrl,
    });
  };

  return (
    <div
      ref={backdropRef}
      className="collection-add-modal__backdrop"
      onClick={onCancel}
    >
      <form
        className="collection-add-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onSubmit={handleSubmit}
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id={titleId} className="collection-add-modal__title">링크 추가</h2>

        <label className="collection-add-modal__field">
          <span>추가할 링크 이름</span>
          <input
            ref={nameInputRef}
            type="text"
            value={name}
            placeholder="예) 홈페이지"
            maxLength={20}
            onChange={(event) => setName(event.target.value)}
          />
        </label>

        <label className="collection-add-modal__field">
          <span>링크 주소</span>
          <input
            type="text"
            inputMode="url"
            value={urlInput}
            placeholder="링크 주소 입력"
            onChange={(event) => setUrlInput(event.target.value)}
          />
        </label>

        <button
          className="collection-add-modal__submit"
          type="submit"
          disabled={!canSubmit}
          aria-busy={isFaviconResolving}
          aria-label={isFaviconResolving ? '아이콘 확인 중' : undefined}
        >
          {isFaviconResolving ? (
            <span className="collection-add-modal__spinner" aria-hidden="true" />
          ) : '확인'}
        </button>
      </form>
    </div>
  );
};

export default CollectionAddModal;
