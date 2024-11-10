<script>
    import AddToCart from "./AddToCart.svelte";
    import {checkQuantity, removeItem} from "../stores/collectionStore.js";
    import {authStore} from "../stores/authStore.js";
    import {doc, getDoc} from "firebase/firestore";
    import {db} from '$lib/firebase/firebase.client.js'

    let {uid, bookId} = $props()
    let book = $state({})

    $effect(async ()=>{
        let docRef = doc(db, "Books", bookId)
        let result = await getDoc(docRef)
        if (result.exists()) book = {id: bookId, ...result.data()}
    })
    $inspect(book)

</script>

<div class="w-full h-[300px] rounded-2xl bg-red-700 text-white my-3 flex p-5">
    {#key book}
        <div class="w-1/5 h-full bg-yellow-400 rounded-md overflow-clip flex items-center">
            <img src={book.PhotoString} alt={book.Name + ' book cover'} class="w-full">
        </div>
        <div class="w-3/5 h-full flex items-center px-8 text-2xl font-bold">
            Name: {book.Name} <br>
            Author: {book.Author} <br>
            Genre: {book.Genre}
        </div>
        <div class="w-1/5">
            <AddToCart bookId={book.id} removeItemButton={true}/>
        </div>
    {/key}
</div>