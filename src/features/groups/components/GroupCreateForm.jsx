import { useGroupCreateForm } from '@/features/groups/hooks/useGroupCreateForm';
import ButtonSpinner from '@/shared/components/button-spinner/ButtonSpinner';
import './GroupCreateForm.css';

const GroupCreateForm = ({ onSubmit, isPending = false }) => {
  const { form, updateField } = useGroupCreateForm();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isPending) onSubmit(form);
  };

  return (
    <form className="group-create-form" onSubmit={handleSubmit}>
      <label className="group-create-form__field">
        <span>그룹 이름</span>
        <input
          value={form.name}
          onChange={(event) => updateField('name', event.target.value)}
          placeholder="그룹 이름 작성 (최대 15자)"
          maxLength={15}
          required
          disabled={isPending}
        />
      </label>

      <fieldset className="group-create-form__field">
        <legend>그룹 종류</legend>
        <div className="group-create-form__category-toggle">
          {['부서', '스터디'].map((category) => (
            <button
              key={category}
              className={form.category === category ? 'active' : ''}
              type="button"
              aria-pressed={form.category === category}
              onClick={() => updateField('category', category)}
              disabled={isPending}
            >
              {category}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="group-create-form__field">
        <span>그룹 소개</span>
        <textarea
          value={form.description}
          onChange={(event) => updateField('description', event.target.value)}
          placeholder={'그룹 소개글을 적어주세요! (최대 100자)'}
          maxLength={100}
          required
          disabled={isPending}
        />
      </label>

      <fieldset className="group-create-form__field">
        <legend>모집 기간</legend>
        <div className="group-create-form__dates">
          <input
            type="date"
            aria-label="모집 시작일"
            value={form.recruitmentStartDate}
            onChange={(event) =>
              updateField('recruitmentStartDate', event.target.value)
            }
            required
            disabled={isPending}
          />
          <span>~</span>
          <input
            type="date"
            aria-label="모집 종료일"
            value={form.recruitmentEndDate}
            min={form.recruitmentStartDate || undefined}
            onChange={(event) =>
              updateField('recruitmentEndDate', event.target.value)
            }
            required
            disabled={isPending}
          />
        </div>
      </fieldset>

      <label className="group-create-form__field">
        <span>인원</span>
        <input
          type="number"
          value={form.memberLimit}
          min="1"
          max="50"
          onChange={(event) =>
            updateField('memberLimit', Number(event.target.value))
          }
          required
          disabled={isPending}
        />
      </label>

      <button
        className="group-create-form__submit"
        type="submit"
        disabled={isPending}
        aria-busy={isPending}
        aria-label={isPending ? '그룹 생성 중' : undefined}
      >
        {isPending ? <ButtonSpinner /> : '그룹 생성'}
      </button>
    </form>
  );
};

export default GroupCreateForm;
