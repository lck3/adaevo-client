import '../assets/css/alert-notice.scss'

const template = `
<div class="platform-alert success-notice" style="display: none">
  <span class="fas fa-exclamation-circle"></span>
  <span class="msg"></span>
</div>
`;

/** 
 * Unlike `handleRemoteOperationError`, this function will display an 
 * alert when certain backend operations are successful. 
 * @param {String} message An internationalized message to display on the
 * notice 
 * */
export function handleRemoteOperationSuccess(message: string) {
  const containerQuery = document.querySelector("body .platform-alert.success-notice");

  if (!containerQuery) {
    // @ts-ignore
    document.querySelector("body").insertAdjacentHTML("afterbegin", template);
  }
  // @ts-ignore
  const alertContainer: HTMLElement = document.querySelector(".platform-alert.success-notice");
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
