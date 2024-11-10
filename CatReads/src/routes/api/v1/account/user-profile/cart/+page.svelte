<script>
    import CartItem from "../../../../../../components/CartItem.svelte";

    import {goto} from "$app/navigation";
    import {onDestroy, onMount} from "svelte";
    import {onSnapshot, query, collection, where, getDoc, doc} from "firebase/firestore"

    import {db} from '$lib/firebase/firebase.client.js'
    import {authStore} from "../../../../../../stores/authStore.js";

    let unsubscribe;
    let bookIds = $state([]);
    let listnerAdded = false

    $effect(() => {
        if ($authStore.currentUser && listnerAdded === false) {
            console.log('ayo')
            const q = query(collection(db, "Carts"), where("uid", "==", $authStore.currentUser.uid))
            unsubscribe = onSnapshot(q, (querySnap) => {
                querySnap.forEach(async (qDoc)=>{
                    console.log('called')
                    let id = qDoc.data().itemId
                    if (!bookIds.includes(id)) bookIds = [...bookIds, id]
                })
            })
            listnerAdded = true
        }
    })

    onDestroy(() => {
        unsubscribe && unsubscribe()
    })

</script>

<div class="bg-red-200 min-w-[99.55vw] min-h-full p-10">
    <h1 class="text-5xl text-center font-black">Your Cart</h1>
    {#key bookIds}
        {#if bookIds.length > 0}
            {#each bookIds as book}
                <CartItem bookId={book} uid={$authStore.currentUser.uid}/>
            {/each}
        {:else}
            <p>Loading your cart items...</p>
        {/if}
    {/key}
    <div class="mt-5 flex justify-between">
        <button class="w-1/3 h-1/2 bg-red-400 border-amber-600 rounded-lg text-white font-bold hover:bg-red-500 transition-all text-lg py-4"
                onclick={()=>goto('/api/v1/account/user-profile')}>
            Go Back
        </button>
        <button class="w-1/3 h-1/2 bg-red-400 border-amber-600 rounded-lg text-white font-bold hover:bg-red-500 transition-all text-lg py-4">
            Checkout
        </button>
    </div>
</div>