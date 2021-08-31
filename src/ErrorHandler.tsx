import React from "react";
import { FullPageErrorFallback } from "./components/lib";
import './assets/css/alert-notice.scss'

const template = `
<div class="platform-alert" style="display: none">
  <span class="fas fa-exclamation-circle"></span>
  <span class="msg"></span>
  <div class="close-btn">
    <span class="fas fa-times"></span>
  </div>
</div>
`;

export function ErrorFallback({ error }: any) {
  return (
    <>
      <FullPageErrorFallback error={error} />
    </>
  );
}

export function handleRemoteOperationError(error: any) {
  const containerQuery = document.querySelector("body .platform-alert");
  if (!containerQuery) {
    // @ts-ignore
    document.querySelector("body").insertAdjacentHTML("afterbegin", template);
  }
  // @ts-ignore
  const alertContainer: HTMLElement = document.querySelector(".platform-alert");
  if (alertContainer) {
    
    alertContainer.style.display = "block";
    alertContainer.classList.add("showAlert");

    const messageDiv = alertContainer.querySelector('.msg')
    if (messageDiv) {
      messageDiv.innerHTML = error.message
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
