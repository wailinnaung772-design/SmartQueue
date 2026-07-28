// Supabase Configuration
const supabaseUrl = "https://hsxsdpbsbsrpzevhtkjv.supabase.co";

const supabaseKey = "sb_publishable_ppeg_fT7D29bDGFHa5fUyA_DzhK9n9RY";


// Create Supabase Client



const supabaseClient = supabase.createClient(
    supabaseUrl,
    supabaseKey
);


// Get recovery session from reset link
async function getSessionFromUrl()
{
    const { data, error } =
        await supabaseClient.auth.exchangeCodeForSession(
            window.location.href
        );


    if(error)
    {
        console.log(error.message);
    }
}


getSessionFromUrl();



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
        "Password updated successfully";

        document.getElementById("openApp")
        .style.display = "block";
    }

}



function openApp()
{
    window.location.href =
    "smartqueue:login";
}
