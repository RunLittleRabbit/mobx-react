import {action, observable} from "mobx";
import {API_URL} from "../constants";

export class Store {
    @observable posts = [];
    @observable filteredPosts = [];
    @observable loading = false;

    @action
    getPosts = () => {
        this.loading = true;
        return fetch(API_URL)
            .then(resp => resp.json())
            .then(data => {
                this.posts = data.pageItems;
                this.filteredPosts = data.pageItems;
            })
            .catch(e => console.error(e))
            .finally(() => this.loading = false);
    }
    @action
    getFilteredPosts = (e) => this.filteredPosts =  this.posts.filter(el => el.productName.toLowerCase().includes(e.target.value))
}
