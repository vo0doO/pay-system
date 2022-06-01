INIT = {
    "RUB": 10000,
    }
ONE = {
    "RUB/MWZ": 53,
    "RUB/USDT": 64,
    } 
TWO = {
    "WMZ/RUB": 56.92
    }
COMSA = {
    "RUB/MWZ": {
        "procents": 0.025,
        "fix": 40,
    },
    "WMZ/RUB": {
        "procents": 0.025,
        "fix": 40,
    },
}


def RUB_WMZ_RUB(INIT, COMSA, ONE, TWO):

    state_ONE = (INIT - (INIT * COMSA["RUB/WMZ"]["procents"]))/ONE
    
    state_TWO = ( state_ONE - (( state_ONE * COMSA["MWZ/RUB"]["procents"] ) + COMSA["WMZ/RUB"]["fix"] ) ) * TWO
    
    out = state_TWO
    
    print(f"\n \n Отдам {INIT} RUB --> Получу {state_ONE} MWZ --> {out} RUB верну \n \n")


calculate_exchange(INIT=INIT["RUB"],COMSA=COMSA, ONE=ONE["RUB/MWZ"],TWO=TWO["WMZ/RUB"])