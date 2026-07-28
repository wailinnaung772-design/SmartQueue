// Supabase Configuration
const supabaseUrl = "https://hsxsdpbsbsrpzevhtkjv.supabase.co";
const supabaseKey = "sb_publishable_ppeg_fT7D29bDGFHa5fUyA_DzhK9n9R";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// Get recovery session from URL
async function getSessionFromUrl() {
  const hash = window.location.hash;
  if (hash) {
    const params = new URLSearchParams(hash.substring(1));
    const access_token = params.get("access_token");

    if (access_token) {
      const { data, error } = await supabaseClient.auth.exchangeCodeForSession(access_token);
      if (error) {
        console.log("Session error:", error.message);
      } else {
        console.log("Recovery session created:", data);
      }
    }
  }
}
getSessionFromUrl();

// Reset password function
async function resetPassword() {
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const message = document.getElementById("message");

  if (password !== confirmPassword) {
    message.innerHTML = "Passwords do not match";
    return;
  }

  const { error } = await supabaseClient.auth.updateUser({ password: password });
  if (error) {
    message.innerHTML = error.message;
  } else {
    message.innerHTML = "Password updated successfully";
    document.getElementById("openApp").style.display = "block";
  }
}

// Open app deep link
function openApp() {
  window.location.href = "smartqueue://login";
}
