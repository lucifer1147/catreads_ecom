<script>
    import left_img from '$lib/images/signup_left.png';
    import {authHandlers, authStore} from "../stores/authStore.js";
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";

    let register = $props();

    $effect(()=>{
        if (!$authStore.isLoading && $authStore.currentUser !== null) goto('/')
    })
    
    const handlesubmit = async (provider = undefined) => {
        if (!details.email || !details.pass) {
            if (provider === 'google') {
                try {
                    await authHandlers.signup_google()
                } catch (err) {
                    console.log(err)
                }
            }
            if ($authStore.currentUser) {
                window.location.href = '/'
            }
            return
        }

        if (register) {
            try {
                await authHandlers.signup(details.email, details.pass)
            } catch (err) {
                console.log(err)
            }
        }

        if (!register) {
            try {
                await authHandlers.login(details.email, details.pass)
            } catch (err) {
                console.log(err)
            }
        }

        if ($authStore.currentUser) {
            window.location.href = '/'
        }
    }

    let details = {
        email: "",
        pass: ""
    }
</script>

<div class="flex bg-neutral-900 h-1/2 w-2/3 rounded-2xl text-white shadow-black shadow-2xl">
    <div class="h-full w-1/2 rounded-l-2xl"
         style="background-image: url('{left_img}'); background-repeat: no-repeat; background-position: center; background-size: cover">
        <div class="absolute w-1/3 h-1/2 rounded-l-2xl bg-teal-500 bg-opacity-40"></div>
    </div>
    <div class="h-full w-1/2 px-10 items-center">
        <h1 class="text-5xl font-serif text-center mt-10 mb-4 w-full font-bold">
            {#if register}
                SignUp!
            {:else}
                Login!
            {/if}
        </h1>


        <form>
            <input type="text" name="signup_email" id="signupEmail" placeholder="Email" bind:value={details.email}
                   class="outline-none text-black w-full py-2 px-3 font-semibold rounded-lg my-1">

            <input type="password" name="signup_pass" id="signupPass" placeholder="Password" bind:value={details.pass}
                   class="outline-none text-black w-full py-2 px-3 font-semibold rounded-lg">

            <button class="bg-neutral-300 w-full text-black my-3 text-lg py-2 rounded-lg font-bold hover:text-white hover:bg-neutral-950 transition-all"
                    on:click={handlesubmit}>
                {#if register}
                    SignUp
                {:else}
                    Login
                {/if}
            </button>
        </form>

        <div class="flex items-center gap-x-1 text-xs w-full">
            <hr class="w-full">
            <p>OR</p>
            <hr class="w-full">
        </div>

        <button class="bg-blue-600 w-full text-2xl py-3 rounded-xl my-3 font-bold hover:bg-blue-700 transition-all hover:text-yellow-400"
                on:click={()=>{handlesubmit('google')}}>
            {#if register}
                SignUp with Google
            {:else}
                Login with Google
            {/if}
        </button>

        {#if register}
            <p class="w-full text-center text-sm">Already have an account? <a href="/api/v1/auth/login/"
                                                                              class="text-teal-400 hover:text-teal-500">Login
                Here!</a></p>
        {:else}
            <p class="w-full text-center text-sm">Don't have an account? <a href="/api/v1/auth/signup/"
                                                                            class="text-teal-400 hover:text-teal-500">SignUp
                Here!</a></p>
        {/if}
    </div>
</div>