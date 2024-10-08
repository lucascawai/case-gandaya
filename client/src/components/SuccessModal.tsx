import { FC } from "react";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const SuccessModal: FC<ModalProps> = ({
  onClose,
  title,
  show,
  children,
}) => {
  if (!show) return null; // Não renderiza o modal se não estiver visível

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-black rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="mb-6">{children}</div>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};
