const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const submit = form.querySelector('button[type="submit"]');
  submit.disabled = true;
  status.textContent = 'Sending your message…';
  status.dataset.state = 'sending';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(form)
    });
    const result = await response.json();
    if (!response.ok || result.success !== 'true' && result.success !== true) {
      throw new Error(result.message || 'The message could not be sent.');
    }
    form.reset();
    status.textContent = 'Thanks for reaching out. Your message has been sent.';
    status.dataset.state = 'success';
  } catch (error) {
    status.textContent = 'We couldn’t send your message just now. Please email funbiosync@hotmail.com.';
    status.dataset.state = 'error';
  } finally {
    submit.disabled = false;
  }
});
