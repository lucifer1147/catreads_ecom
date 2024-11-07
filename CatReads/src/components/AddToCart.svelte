<script>
    export let bookId

    import {authStore} from "../stores/authStore.js";
    import {addToCart, checkQuantity} from "../stores/collectionStore.js";

    let user;
    let quantity;

    let asd = setInterval(async () => {
        if ($authStore.isLoading === false) {
            user = $authStore.currentUser
            quantity = checkQuantity(user.uid, bookId)
            clearInterval(asd)
        }
    }, 100)


    const clickHandle = async (inc) => {
        await addToCart(user.uid, bookId, inc);
        quantity = await checkQuantity(user.uid, bookId)
        console.log(quantity)
    }
</script>

{#key quantity}
    {#await quantity}
        <button class="w-full h-1/2 bg-amber-400 border-amber-600 border-b-2 rounded-t-lg text-white font-bold">
            Add To Cart
        </button>
    {:then quantity}

        {#if !quantity}
            <button class="w-full h-1/2 bg-amber-400 border-amber-600 border-b-2 rounded-t-lg text-white font-bold hover:bg-amber-500 transition-all"
                    onclick={()=>{clickHandle(1)}}>
                Add To Cart
            </button>
        {:else if quantity > 0}
            <div class="h-1/2 flex w-full">
                <button class="w-1/3 h-full bg-amber-400 border-amber-600 border-b-2 rounded-tl-lg text-white font-bold hover:bg-amber-500 transition-all text-3xl flex items-center justify-center pb-2"
                        onclick={()=>{clickHandle(-1)}}>
                    -
                </button>
                <button class="w-1/3 h-full bg-white border-amber-600 border-b-2 text-black font-bold text-xl flex items-center justify-center">{quantity}</button>
                <button class="w-1/3 h-full bg-amber-400 border-amber-600 border-b-2 rounded-tr-lg text-white font-bold hover:bg-amber-500 transition-all text-3xl flex items-center justify-center pb-2"
                        onclick={()=>{clickHandle(1)}}>
                    +
                </button>
            </div>
        {/if}
    {/await}
{/key}