<script>
    import {authStore} from "../stores/authStore.js";
</script>

<nav class="z-50 w-full h-[10%] fixed bg-neutral-950 border-b-4 border-orange-600 shadow-lg shadow-orange-900 text-white flex items-center px-5 gap-x-5">
    <h1 class="text-3xl font-black font-sans w-[10%]">CatReads</h1>
    <p class="w-[10%]">
        <span class="font-bold">Delivering To</span> Imagination, 213455
    </p>

    <p class="w-[60%] flex">
        <input type="text" class="outline-none text-black w-full py-2 px-3 font-semibold rounded-l-lg"
               placeholder="Search For what you need">
        <button class="bg-orange-500 px-3 font-semibold hover:bg-orange-700 transition-all rounded-r-xl border-l-2 border-black">
            Search
        </button>
    </p>

    <div class="w-[15%] rounded-lg h-[70%] bg-neutral-900 flex">
        {#if $authStore.currentUser}
            <a class={"flex justify-center items-center text-md flex-wrap w-full h-full"} href="/api/v1/account/user-profile">
                Welcome Back, <strong class="w-full text-center">{$authStore.currentUser.displayName}</strong>
            </a>
        {:else}
            <a class="h-full flex items-center justify-center bg-orange-500 hover:bg-orange-700 border-r-2 border-black rounded-l-lg font-bold text-lg w-1/2 transition-all" href="/api/v1/auth/signup">SignUp</a>
            <a class="h-full flex items-center justify-center bg-orange-500 hover:bg-orange-700 border-l-2 border-black rounded-r-lg font-bold text-lg w-1/2 transition-all" href="/api/v1/auth/login/">Login</a>
        {/if}
    </div>
</nav>