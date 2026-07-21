import {
  useEffect,
  useId,
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
  const nameInputRef = useRef(null);
  const isSubmittingRef = useRef(false);
  const isMountedRef = useRef(true);
  const [name, setName] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [isFaviconResolving, setIsFaviconResolving] = useState(false);
  const normalizedUrl = useMemo(() => normalizeCollectionUrl(urlInput), [urlInput]);
  const canSubmit = Boolean(name.trim() && normalizedUrl && !isFaviconResolving);

  useEffect(() => {
    isMountedRef.current = true;
    nameInputRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      isMountedRef.current = false;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCancel]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!canSubmit || isSubmittingRef.current) return;

    isSubmittingRef.current = true;
    setIsFaviconResolving(true);

    const logo = await resolveFaviconUrl(normalizedUrl, name);

    if (!isMountedRef.current) return;

    onAdd({
      name: name.trim(),
      url: normalizedUrl,
      logo,
    });
  };

  return (
    <div
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
