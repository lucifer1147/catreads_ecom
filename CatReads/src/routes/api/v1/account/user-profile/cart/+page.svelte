<script>
    import {getCartItems} from "../../../../../../stores/collectionStore.js";
    import {authStore} from "../../../../../../stores/authStore.js";
    import {doc, getDoc} from "firebase/firestore";
    import {db} from "$lib/firebase/firebase.client.js";

    import CartItem from "../../../../../../components/CartItem.svelte";
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";

    let books = [];

    onMount(async () => {
        if ($authStore.isLoading === false) {
            let uid = $authStore.currentUser.uid;
            await cartItemsToBooks(await getCartItems(uid));
        }
    });

    const cartItemsToBooks = async (items) => {
        Array.from(items).forEach(async (val) => {
            let bookId = val.itemId
            let book = {}

            const docRef = doc(db, 'Books', bookId)
            await getDoc(docRef).then(docSnap => {
                if (docSnap.exists()) {
                    book = {id: bookId, ...docSnap.data()}
                }
            })

            books = [...books, book]
        })
    }

</script>

<div class="bg-orange-200 min-w-[99.55vw] min-h-full p-10">
    <h1 class="text-5xl text-center font-black">Your Cart</h1>
    {#key books}
        {#if books.length > 0}
            {#each books as book}
                <CartItem {book}/>
            {/each}
        {:else}
            <p>Loading your cart items...</p>
        {/if}
    {/key}
    <div class="mt-5 flex justify-between">
        <button class="w-1/3 h-1/2 bg-orange-400 border-amber-600 rounded-lg text-white font-bold hover:bg-orange-500 transition-all text-lg py-4" onclick={()=>goto('/api/v1/account/user-profile')}>
            Go Back
        </button>
        <button class="w-1/3 h-1/2 bg-orange-400 border-amber-600 rounded-lg text-white font-bold hover:bg-orange-500 transition-all text-lg py-4">
            Checkout
        </button>
    </div>
</div>