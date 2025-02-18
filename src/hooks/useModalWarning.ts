import { App } from 'antd';

export interface ModalWarning {
  title: string;
  content: string;
  onOk: (...props: any) => any;
}

export const useModalWarning = () => {
  const { modal } = App.useApp();

  return ({ title, content, onOk }: ModalWarning) =>
    modal.warning({ title, content, onOk, closable: true, okCancel: true });
};
