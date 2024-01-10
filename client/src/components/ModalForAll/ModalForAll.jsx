import React from "react";
import { Dialog, DialogHeader } from "@material-tailwind/react";
import { CgClose } from "react-icons/cg";

const ModalForAll = ({ title, children, open, setOpen }) => {
  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Dialog
        open={open}
        size="xs"
        variant="gradient"
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <div className="relative m-4">
          <button onClick={handleOpen} className="absolute right-0 top-0">
            <CgClose size={22} />
          </button>
        </div>
        <DialogHeader>{title}</DialogHeader>

        <div className="p-4">{children}</div>
      </Dialog>
    </>
  );
};

export default ModalForAll;
