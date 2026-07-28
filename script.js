// Supabase Configuration
const supabaseUrl = "https://hsxsdpbsbsrpzevhtkjv.supabase.co";

const supabaseKey = "sb_publishable_ppeg_fT7D29bDGFHa5fUyA_DzhK9n9R";


const supabaseClient = supabase.createClient(
    supabaseUrl,
    supabaseKey
);



// Get recovery session
async function getSessionFromUrl()
{
    const hash = window.location.hash;


    if(hash)
    {
        const params =
        new URLSearchParams(
            hash.substring(1)
        );


        const access_token =
        params.get("access_token");


        const refresh_token =
        params.get("refresh_token");


        if(access_token && refresh_token)
        {
            const { error } =
            await supabaseClient.auth.setSession(
            {
                access_token: access_token,
                refresh_token: refresh_token
            });


            if(error)
            {
                console.log(error.message);
            }
            else
            {
                console.log("Recovery session created");
            }
        }
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
    "smartqueue://login";
}
