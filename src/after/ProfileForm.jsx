// src/after/ProfileForm.jsx (React 19)
import { useActionState } from "react";
import { submitForm } from "../api";

export default function ProfileForm() {
  const [error, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      const name = formData.get("name");
      try {
        await submitForm(name);
        return null; // 성공 시 에러 없음
      } catch (err) {
        return err.message; // 실패 시 에러 메시지 반환
      }
    },
    null
  );

  return (
    <form action={submitAction} data-testid="profile-form">
      <h4>프로필 업데이트 (React 19)</h4>
      <input
        type="text"
        name="name"
        placeholder="이름 입력"
        disabled={isPending}
        data-testid="profile-name-input"
        aria-label="이름 입력"
      />
      <button
        type="submit"
        disabled={isPending}
        data-testid="profile-submit-button"
        aria-busy={isPending}
      >
        {isPending ? "저장 중..." : "저장"}
      </button>
      {error && (
        <p className="error" data-testid="profile-error-message" role="alert">
          {error}
        </p>
      )}
      {/* 성공 메시지는 submitForm 내부의 alert로 대체되었습니다. */}
      {/* 필요하다면 useActionState의 결과값을 사용하여 성공 UI를 렌더링할 수 있습니다. */}
    </form>
  );
}
