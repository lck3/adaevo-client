import React from "react";
import { FullPageErrorFallback } from "../components/lib";
import  i18n  from '../i18n/config';
import '../assets/css/alert-notice.scss'

const template = `
<div class="platform-alert failure-notice" style="display: none">
  <span class="fas fa-exclamation-circle"></span>
  <span class="msg"></span>
</div>
`;

export function ErrorFallback({ error }: any) {
  return (
    <>
      <FullPageErrorFallback error={error} />
    </>
  );
}

export function handleRemoteOperationError(error: Error | {code: number, message: string}) {
  const containerQuery = document.querySelector("body .platform-alert.failure-notice");
  let message = ''
  if (error instanceof Error) {
    message = error.message
  } else {
    message = i18n.t(`serverResponse.${error.code}`)
  }
  if (!containerQuery) {
    // @ts-ignore
    document.querySelector("body").insertAdjacentHTML("afterbegin", template);
  }
  // @ts-ignore
  const alertContainer: HTMLElement = document.querySelector(".platform-alert.failure-notice");
  if (alertContainer) {
    
    alertContainer.style.display = "block";
    alertContainer.classList.add("showAlert");

    const messageDiv = alertContainer.querySelector('.msg')
    if (messageDiv) {
      messageDiv.innerHTML = message
    }
    setTimeout(function () {
      alertContainer.style.display = "none";
      alertContainer.classList.remove("showAlert");
      // @ts-ignore
      if (messageDiv) {
        messageDiv.innerHTML = ""

      }
    }, 5000);
  }
}
