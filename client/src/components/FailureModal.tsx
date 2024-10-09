import { FC } from "react";
import failure from "../assets/failure.png";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  title: string;
}

export const FailureModal: FC<ModalProps> = ({ onClose, title, show }) => {
  if (!show) return null; // Não renderiza o modal se não estiver visível

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-20">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 mx-4 flex flex-col items-center">
        <img src={failure} alt="failure sign" className="rounded-lg" />
        <p className="text-xl font-bold mb-4 text-black">{title}</p>
        <button
          onClick={onClose}
          className="bg-gandaya-green rounded-[32px] h-12 w-4/5 flex justify-center items-center"
        >
          <div className="text-black font-bold">Continuar</div>
        </button>
      </div>
    </div>
  );
};
