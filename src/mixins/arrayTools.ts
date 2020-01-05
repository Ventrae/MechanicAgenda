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
            this.$store.state.transactions = this.getTransactions();
            this.$store.state.users = this.getUsers();
            this.$store.state.cars = this.getCars();
            this.$store.state.clients = this.getClients();
            this.$store.state.allServices = this.getServices();
        }
    }
};