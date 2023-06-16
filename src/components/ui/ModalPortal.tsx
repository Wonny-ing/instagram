import reactDOM from 'react-dom';

type Props = {
  children: React.ReactNode;
};

export default function ModalPortal({ children }: Props) {
  // SSR일때는 처리해 주지 않기 위해서, 브라우저 환경일때만 사용하기 위해
  if (typeof window === 'undefined') {
    return null;
  }
  const node = document.getElementById('portal') as Element;
  return reactDOM.createPortal(children, node);
}
