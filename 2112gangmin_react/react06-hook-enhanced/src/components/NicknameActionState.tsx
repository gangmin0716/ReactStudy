import {useActionState} from 'react';

async function changeNickname(
  _previousState: string,
  formData: FormData
): Promise<string> {
  const nickname = formData.get('nickname');

  if (typeof nickname !== 'string' || nickname.trim() === ''){
    return '닉네임을 입력해 주세요.';
  }

  await new Promise<void>((resolve) =>
  setTimeout(resolve, 1000));

  return `${nickname.trim()} 닉네임으로 변경되었습니다.`;
}

export default function NicknameActionState() {
  const [message, formAction, isPending] = useActionState(changeNickname, '');

  return (
    <div>
      <h2>닉네임 변경하기</h2>
      <form action={formAction}>
        <input
          type="text"
          name="nickname"
          placeholder="새 닉네임을 입력하세요"
        />

        <button type="submit" disabled={isPending}>
          {isPending ? '변경 중...' : '번경'}
        </button>
      </form>

      <p>{message}</p>
    </div>
  )
}