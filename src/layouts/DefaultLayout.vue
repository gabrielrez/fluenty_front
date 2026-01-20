<template>
    <div class="flex min-h-screen">
        <Sidebar />

        <div class="flex flex-col flex-1">
            <Header />

            <main class="flex-1 p-6">
                <router-view />
            </main>

            <Footer />
        </div>
    </div>
</template>