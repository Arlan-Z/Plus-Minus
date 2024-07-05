export class RevolverModel{
    myIndex = 0;
    rivalIndex = 0;

    noChance = Math.random() * 0.25 + 0.25;
    myAns = true;

    decide(index){
        this.myIndex = index;
        this.myIndex == 1 ? this.rivalIndex = 2 : this.rivalIndex = 1;

        return this.think();
    }

    think(){
        if(this.noChance > Math.random()) this.myAns = false;
        return this.myAns
    }
}