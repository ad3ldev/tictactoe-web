export function trial() {
    console.log("hello");
};

function minimize(state:string){
    if (state == "terminal"){
        return [null, state];
    }
    let [minChild, minUtility] = [null, Infinity];
    for (child in state.children()){

    }
}