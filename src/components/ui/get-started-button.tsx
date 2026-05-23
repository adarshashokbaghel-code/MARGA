"use client";

import type { ComponentProps } from "react";

import { useLoginModal } from "@/components/providers/login-modal-provider";
import { Button } from "@/components/ui/button";

type GetStartedButtonProps = ComponentProps<typeof Button>;

function GetStartedButton({ onClick, children, ...props }: GetStartedButtonProps) {
  const { openLogin } = useLoginModal();

  return (
    <Button
      type="button"
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          openLogin();
        }
      }}
      {...props}
    >
      {children}
    </Button>
  );
}

export { GetStartedButton };
