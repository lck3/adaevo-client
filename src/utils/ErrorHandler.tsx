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

export interface PlatformServerError extends Error {
  "message": string,
  "response"?: {
    "data": {
      "url": string,
      "error": string,
      "code": number,
      "content": string
    }
  }
}


export function ErrorFallback({ error }: any) {
  return (
    <>
      <FullPageErrorFallback error={error} />
    </>
  );
}

/**
 * Errors from the server are passed in using the response body as the first parameter.
 * Server errors contain a `code` property which helps the client display the 
 * correct error message alert.
 * Errors generated from client operations are expected to be native JS errors.
 * This function will use the `message` property to display an error message alert.
 * @param error 
 */
export function handleRemoteOperationError(error: PlatformServerError, options? : {message: string} ) {
  const containerQuery = document.querySelector("body .platform-alert.failure-notice");
  let message = ''
  if (options && options.message) {
    message = options.message
  } else if (!error.response) {
    message = error.message
  } else {
    message = i18n.t(`serverResponse.${error.response.data.code}`)
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

