<script>
    import {authStore, authHandlers} from "../../../../../stores/authStore.js";

    import {browser} from "$app/environment";
    import {goto} from "$app/navigation";

    let user = $state({
        photoURL: undefined,
    })

    let asd = setInterval(() => {
        if ($authStore.isLoading === false) {
            user = $authStore.currentUser
            if ($authStore.currentUser === null) {
                if (browser) goto('/api/v1/auth/login/')
            }
            clearInterval(asd)
        }
    }, 10)
</script>

<div class="bg-orange-200 w-[100vw] h-full flex">
    <button class="fixed w-32 h-16 text-center bg-orange-600 translate-y-5 translate-x-5 rounded-lg text-white hover:bg-orange-700 font-bold text-lg transition-all" onclick={goto('/')}>Home Page</button>

    {#key user}
        <div class="h-full w-1/2 border-r-2 border-orange-500 flex justify-center flex-col px-10 items-center">
            <div class="h-32 w-32 rounded-full overflow-clip border-4 border-orange-500 flex justify-center items-center">
                <img src={user ? user.photoURL : ""} class="w-full h-full" alt=""/>
            </div>

            <div class="mt-5 flex gap-x-0.5 text-sm w-full items-end px-2 font-bold">
                <hr class="w-1/12 border-b-2 border-black mb-2">
                Username
                <hr class="w-full border-b-2 border-black mb-2">
            </div>
            <input type="text" readonly value={user ? user.displayName: ""}
                   class="w-full text-xl p-5 font-bold rounded-2xl">
            <div class="flex gap-x-0.5 text-sm w-full items-end px-2 font-bold">
                <hr class="w-1/12 border-b-2 border-black mb-2">
                Email
                <hr class="w-full border-b-2 border-black mb-2">
            </div>
            <input type="text" readonly value={user ? user.email : ""} class="w-full text-xl p-5 font-bold rounded-2xl">

            <div class="w-full flex mt-5 h-16">
                <button class="bg-blue-600 w-1/2 rounded-l-2xl border-r-2 border-blue-700 text-white font-bold text-lg hover:bg-blue-700 transition-all">Update Profile Details</button>
                <button class="bg-blue-600 w-1/2 rounded-r-2xl border-l-2 border-blue-700 text-white font-bold text-lg hover:bg-blue-700 transition-all" onclick={()=>{authHandlers.logout(); goto('/')}}>Logout</button>
            </div>

        </div>
    {/key}

    <div class="h-full w-1/2 border-l-2 border-orange-500 flex flex-col px-5 items-center justify-center">
        <button class="w-full text-3xl bg-blue-200 rounded-2xl p-5 font-extrabold hover:bg-blue-300 transition-all" onclick={()=>goto('/api/v1/account/user-profile/cart/')}>Your
            Cart <br> <span class="text-sm font-normal">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro, repudiandae!</span>
        </button>
        <button class="w-full text-3xl bg-amber-400 rounded-2xl my-5 p-5 font-extrabold hover:bg-amber-500 transition-all">
            Your Orders <br> <span class="text-sm font-normal">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro, repudiandae!</span>
        </button>
        <button class="w-full text-3xl bg-orange-400 rounded-2xl p-5 font-extrabold hover:bg-orange-500 transition-all">
            Ordering History <br> <span class="text-sm font-normal">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro, repudiandae!</span>
        </button>
    </div>
</div>