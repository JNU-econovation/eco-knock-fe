import { useGroupCreateForm } from '@/features/groups/hooks/useGroupCreateForm';
import './GroupCreateForm.css';

const GroupCreateForm = ({ onSubmit }) => {
  const { form, updateField } = useGroupCreateForm();

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="group-create-form" onSubmit={handleSubmit}>
      <label className="group-create-form__field">
        <span>그룹 이름</span>
        <input
          value={form.name}
          onChange={(event) => updateField('name', event.target.value)}
          placeholder="행사부"
          maxLength={30}
          required
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
          placeholder={'안녕하세요~~~\n곰세마리가 한집에있엉'}
          maxLength={300}
          required
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
          />
        </div>
      </fieldset>

      <label className="group-create-form__field">
        <span>인원</span>
        <input
          type="number"
          value={form.memberLimit}
          min="2"
          max="100"
          onChange={(event) =>
            updateField('memberLimit', Number(event.target.value))
          }
          required
        />
      </label>

      <button className="group-create-form__submit" type="submit">
        그룹 생성
      </button>
    </form>
  );
};

export default GroupCreateForm;
