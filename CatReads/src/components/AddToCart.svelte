<script>
    import {onMount} from "svelte";

    let {bookId, removeItemButton} = $props()
    // let  = $derived(props)

    import {authStore} from "../stores/authStore.js";
    import {addToCart, checkQuantity, removeItem} from "../stores/collectionStore.js";
    import {goto} from "$app/navigation";

    let user = $state();
    let quantity = $state();

    $effect(async () => {
        if ($authStore.currentUser && bookId) {
            user = $authStore.currentUser
            if (user) quantity = await checkQuantity(user.uid, bookId)
        }
    })

    const clickHandle = async (inc) => {
        await addToCart(user.uid, bookId, inc);
        quantity = await checkQuantity(user.uid, bookId)
    }
</script>

{#key user}
    {#if user && user.currentUser !== null}
        {#key quantity}
            {#await quantity}
                <button class="w-full h-1/2 bg-red-400 border-red-600 border-b-2 rounded-t-lg text-white font-bold">
                    Add To Cart
                </button>
            {:then quantity}

                {#if !quantity}
                    <p class="hidden">{removeItem(user.uid, bookId)}</p>
                    <button class="w-full h-1/2 bg-red-400 border-red-600 border-b-2 rounded-t-lg text-white font-bold hover:bg-red-500 transition-all"
                            onclick={()=>{clickHandle(1)}}>
                        Add To Cart
                    </button>
                {:else if quantity > 0}
                    <div class="h-1/2 flex w-full">
                        <button class="w-1/3 h-full bg-red-400 border-red-600 border-b-2 rounded-tl-lg text-white font-bold hover:bg-red-500 transition-all text-3xl flex items-center justify-center pb-2"
                                onclick={()=>{clickHandle(-1)}}>
                            -
                        </button>
                        <button class="w-1/3 h-full bg-white border-red-600 border-b-2 text-black font-bold text-xl flex items-center justify-center">{quantity}</button>
                        <button class="w-1/3 h-full bg-red-400 border-red-600 border-b-2 rounded-tr-lg text-white font-bold hover:bg-red-500 transition-all text-3xl flex items-center justify-center pb-2"
                                onclick={()=>{clickHandle(1)}}>
                            +
                        </button>
                    </div>
                {:else if quantity === 0}
                    <button class="w-full h-1/2 bg-red-400 border-red-600 border-b-2 rounded-t-lg text-white font-bold hover:bg-red-500 transition-all"
                            onclick={()=>{clickHandle(1)}}>
                        Add To Cart
                    </button>
                {/if}
            {/await}
        {/key}
    {:else}
        <button class="w-full h-1/2 bg-red-400 border-red-600 border-b-2 rounded-t-lg text-white font-bold"
                onclick={()=>goto('/api/v1/auth/login/')}>
            Sign In to Add to Cart
        </button>

    {/if}
    {#if removeItemButton}
        <button class="w-full h-1/2 bg-red-400 border-red-600 border-t-2 rounded-b-lg text-white font-bold hover:bg-red-500 transition-all"
                onclick={()=>removeItem(user.uid, bookId)}>
            Remove Item
        </button>
    {:else}
        <button class="w-full h-1/2 bg-red-400 border-red-600 border-t-2 rounded-b-lg text-white font-bold hover:bg-red-500 transition-all">
            Buy Now
        </button>
    {/if}
{/key}