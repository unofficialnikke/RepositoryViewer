<template>
    <c-page class="container">
        <div v-if="!accessToken" class="header">
            <h2>Not signed in</h2>
            <c-button @click="userLogin" id="login">
                <c-icon :path="mdiLogin" />
                Sign in
            </c-button>
        </div>
        <div v-else>
            <div class="header">
                <h2>Currently signed in</h2>
                <c-button @click="userLogout">
                    <c-icon :path="mdiLogout" />
                    Sign out
                </c-button>
                <div v-if="userRepos.length <= 0">
                    <h2>No starred repositories for {{ userName }}</h2>
                </div>
                <div v-else>
                    <h2>Starred repositories for {{ userName }} ({{ userRepos.length }} repositories)</h2>
                    <c-table responsive class="custom-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Topics</th>
                                    <th>Licenses</th>
                                    <th>Repository URL</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="repo in userRepos" :key="repo.name">
                                    <td>{{ repo.name }}</td>
                                    <td>{{ repo.description }}</td>
                                    <td>{{ repo.topics.length > 0 ? repo.topics.join(', ') : 'No topics' }}</td>
                                    <td>{{ repo.license === null ? 'No licenses' : repo.license }}</td>
                                    <td><a :href="repo.html_url" target="_blank">{{ repo.html_url }}</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </c-table>
                </div>
            </div>
        </div>
    </c-page>
    <FetchData ref="dataFetch" />
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { mdiLogin, mdiLogout } from '@mdi/js'
import FetchData from './FetchData.vue';
import type { IFetchData, IStarredRepos } from '../interface';

const accessToken = ref();
const userName = ref();
const userRepos: Ref<IStarredRepos[]> = ref([]);
const dataFetch = ref<IFetchData>();

const userLogin = () => {
    if (dataFetch.value) {
        dataFetch.value.login()
    }
}

const userLogout = () => {
    localStorage.removeItem('accessToken');
    window.location.href = '/';
}

async function getUserData() {
    const requestConfig = {
        method: 'GET',
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('accessToken')
        }
    }
    try {
        const response = await fetch('http://localhost:4000/getUserData', requestConfig)
        const data = await response.json();
        userName.value = data.login;
        if (userName.value) {
            getRepos();
        }
    } catch (err) {
        console.error(err);
    }
}

async function getRepos() {
    try {
        const response = await fetch(`https://api.github.com/users/${userName.value}/starred`)
        const data = await response.json();
        userRepos.value = data;
        console.log('repos got')
    } catch (err) {
        console.error(err)
    }
}

onMounted(async () => {
    if (dataFetch.value) {
        dataFetch.value.getToken()
        accessToken.value = localStorage.getItem('accessToken');
        getUserData();
    }
})
</script>

<style>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.header {
    text-align: center;
}

.custom-table {
    max-width: 100%;
    text-align: left;
}
</style>