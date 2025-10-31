import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title = "Confirmar acción",
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onCancel}
      aria-describedby="alert-dialog-slide-description"
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: 2,
          minWidth: 360,
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        },
      }}
    >
      <DialogTitle
        sx={{
          fontFamily: '"Outfit", sans-serif',
          fontWeight: 600,
          color: "#b71c1c",
          pb: 0.5,
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <Typography
          id="alert-dialog-slide-description"
          sx={{
            fontFamily: '"Outfit", sans-serif',
            color: "#333",
            mt: 1,
            textAlign: "center",
          }}
        >
          {message}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pt: 2 }}>
        <Button
          onClick={onCancel}
          variant="outlined"
          sx={{
            borderRadius: 3,
            px: 3,
            color: "#333",
            borderColor: "#ccc",
            fontFamily: '"Outfit", sans-serif',
            textTransform: "none",
            "&:hover": {
              borderColor: "#aaa",
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          sx={{
            borderRadius: 3,
            px: 3,
            fontFamily: '"Outfit", sans-serif',
            textTransform: "none",
            boxShadow: "0 4px 10px rgba(183,28,28,0.3)",
          }}
        >
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
