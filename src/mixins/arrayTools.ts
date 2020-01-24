export const arrayTools = {
    methods: {
        //@ts-ignore
        getItemById(arg: Array<genericType>, id: string):genericType | null{
           let result = null;
           arg.forEach(e => {
              if(e.id === id){
                  result = e;
              }
           });
           return result;
        },
        updateVuexState(){
            this.getTransactions().then(transactions => {
                this.$store.state.transactions = transactions;
            });
            // this.$store.state.users = this.getUsers();
            // this.$store.state.cars = this.getCars();
            // this.$store.state.clients = this.getClients();
            // this.$store.state.allServices = this.getServices();
        }
    }
};
