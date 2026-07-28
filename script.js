const supabaseUrl = "https://hsxsdpbsbsrpzevhtkjv.supabase.coYOUR_SUPABASE_URL";

const supabaseKey = "sb_publishable_ppeg_fT7D29bDGFHa5fUyA_DzhK9n9RYOUR_ANON_KEY";


const supabaseClient =
supabase.createClient(
    supabaseUrl,
    supabaseKey
);



async function resetPassword()
{

    const password =
    document.getElementById("password").value;


    const confirmPassword =
    document.getElementById("confirmPassword").value;


    const message =
    document.getElementById("message");



    if(password !== confirmPassword)
    {
        message.innerHTML =
        "Passwords do not match";

        return;
    }



    if(password.length < 6)
    {
        message.innerHTML =
        "Password must be at least 6 characters";

        return;
    }



    const { error } =
    await supabaseClient.auth.updateUser(
    {
        password: password
    });



    if(error)
    {
        message.innerHTML =
        error.message;
    }
    else
    {
        message.innerHTML =
        "Password updated successfully. You can login now.";
    }

}