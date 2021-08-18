import Head from "next/head";
import Link from "next/link";

function IndexScreen() {
    return <div>
        <Head>
            <title>Polyfill.me</title>
            <meta name="description" content="Create forms" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
            <p>Home screen</p>
            <Link href="/editor">Go to Form Editor</Link>
        </main>
    </div>
}

export default IndexScreen;