import './styles.css'
interface IDialogProps {
  isOpen: boolean;
  title: string;
  onCloseAction: () => void;
  confirmAction: () => void;
  body?: React.ReactNode;
  disabled?: boolean;
}

const DefaultDialog = (props: IDialogProps) => {
  if (!props.isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <div className="dialog-title">{props.title}</div>
        {props.body && <div className="dialog-content">{props.body}</div>}
        <div className="dialog-actions">
          <button className="btn btn-primary" onClick={props.onCloseAction}>
            Cancelar
          </button>
          <button
            className="btn btn-primary"
            onClick={props.confirmAction}
            disabled={props.disabled}
            autoFocus
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DefaultDialog;
