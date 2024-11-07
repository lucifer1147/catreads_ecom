<script>
    import {doc, getDoc} from "firebase/firestore";
    import {db} from "$lib/firebase/firebase.client.js";

    import AddToCart from "../../../components/AddToCart.svelte";

    let {data} = $props();
    let bookId = data.book

    let book = $state({})
    const docRef = doc(db, 'Books', bookId)
    getDoc(docRef).then(docSnap => {
        if (docSnap.exists()) {
            book = docSnap.data()
        }
    })
</script>

<div class="h-full w-[100vw] bg-orange-200 flex">
    <div class="bg-yellow-200 w-1/2 flex items-end border-r-2 border-orange-500">
        <div class="bg-gradient-to-b from-black/0 to-black/100 h-1/3 w-full text-white flex items-center justify-center font-sans">
            <div class="w-full text-center">
                <h1 class="text-5xl text-center font-black px-5">{book.Name}</h1>
                <h2 class="text-2xl text-center font-bold px-5 my-3">- {book.Author}</h2>
            </div>
        </div>
    </div>

    <div class="w-1/2 h-full flex flex-col border-l-2 border-orange-500">
        <div class="h-[10%]"></div>

        <div class="w-full h-3/5 p-5 gap-2.5 items-center justify-center flex border-b-2 border-orange-500">
            <div class="w-2/3 h-full flex justify-center items-center flex-wrap">
                <div>
                    <h3 class="font-bold text-2xl w-full">Description: </h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae dolorem dolorum iure maiores
                        minima molestiae mollitia neque nostrum numquam odio quae, qui quia ratione reiciendis,
                        similique tempore voluptatibus. Alias aliquid id ipsam nulla sapiente temporibus veritatis
                        voluptatibus voluptatum? Fugit in labore minus reiciendis sapiente tempore voluptatem. Hic,
                        perferendis, repellendus! Aperiam at dolorem earum id ipsam iste magnam modi necessitatibus
                        nihil nobis perferendis praesentium provident quas quidem quo rerum tenetur, totam ullam vitae
                        voluptatem! Amet dicta quidem similique temporibus veritatis. Laboriosam!
                    </p>
                </div>
            </div>
            <div class="w-1/3 h-full flex flex-col justify-center items-center pt-8">
                <div>
                    <h3 class="font-bold text-2xl">Specifications: </h3>
                    <ul class="list-disc ml-5 mt-3">
                        <li><strong>Height:</strong> X cm (A in)</li>
                        <li><strong>Width:</strong> Y cm (B in)</li>
                        <li class="mb-3"><strong>Thickness:</strong> Z cm (C in)</li>
                        <li><strong>Hardcover:</strong> Yes/No</li>
                        <li class="mb-3"><strong>Resold:</strong> Yes/No</li>
                        <li><strong>Sold By:</strong> Someone</li>
                    </ul>
                </div>
                <div class="flex flex-wrap w-full h-1/2 justify-center mt-5">
                    <AddToCart bookId={bookId} />
                    <button class="w-full h-1/2 bg-orange-400 border-amber-600 border-t-2 rounded-b-lg text-white font-bold hover:bg-orange-500 transition-all">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>

        <div class="w-full h-1/2 border-t-2 border-orange-500 overflow-y-auto">
            <h3 class="font-bold text-2xl w-full p-5">Reviews: </h3>
        </div>
    </div>
</div>
