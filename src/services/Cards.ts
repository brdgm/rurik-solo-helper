import findMandatory from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import Card from './Card'
import Action from './enum/Action'
import Advisor from './enum/Advisor'
import ActionPriority from './enum/ActionPriority'
import Region from './enum/Region'
import Structure from './enum/Structure'

const cards = [
  {
    id: 1, 
    locationOrder: [Region.KIEV, Region.VOLYN, Region.PEREYASLAVL, Region.CHERNIGOV, Region.POLOTSK, Region.SMOLENSK, Region.ROSTOV, Region.NOVGOROD],
    priorities: [
      {
        priority: ActionPriority.ATTACK_MOVE,
        buildOrder: [Structure.STRONGHOLD, Structure.CHURCH, Structure.MARKET],
        actions: [
          { advisor: Advisor.TWO_PLUS, action: Action.SCHEME },
          { advisor: Advisor.FOUR, action: Action.ATTACK, coin: true },
          { advisor: Advisor.ONE, action: Action.MOVE },
          { advisor: Advisor.THREE_PLUS, action: Action.MOVE },
          { advisor: Advisor.FIVE, action: Action.BUILD },
          { advisor: Advisor.TWO, action: Action.MUSTER },
        ]
      },
      {
        priority: ActionPriority.BUILD,
        buildOrder: [Structure.CHURCH, Structure.STRONGHOLD, Structure.MARKET],
        actions: [
          { advisor: Advisor.TWO_PLUS, action: Action.ATTACK },
          { advisor: Advisor.FOUR, action: Action.MUSTER },
          { advisor: Advisor.ONE, action: Action.SCHEME },
          { advisor: Advisor.THREE_PLUS, action: Action.MUSTER },
          { advisor: Advisor.FIVE, action: Action.BUILD, coin: true },
          { advisor: Advisor.TWO, action: Action.MOVE },
        ]
      },
      {
        priority: ActionPriority.TAX,
        buildOrder: [Structure.MARKET, Structure.CHURCH, Structure.STRONGHOLD],
        actions: [
          { advisor: Advisor.TWO_PLUS, action: Action.SCHEME },
          { advisor: Advisor.FOUR, action: Action.TAX, coin: true },
          { advisor: Advisor.ONE, action: Action.BUILD },
          { advisor: Advisor.THREE_PLUS, action: Action.TAX },
          { advisor: Advisor.FIVE, action: Action.MOVE },
          { advisor: Advisor.TWO, action: Action.MUSTER },
        ]
      },
    ]
  },
  {
    id: 2, 
    locationOrder: [Region.CHERNIGOV, Region.SMOLENSK, Region.ROSTOV, Region.POLOTSK, Region.KIEV, Region.VOLYN, Region.NOVGOROD, Region.PEREYASLAVL],
    priorities: [
      {
        priority: ActionPriority.ATTACK_MOVE,
        buildOrder: [Structure.STRONGHOLD, Structure.CHURCH, Structure.MARKET],
        actions: [
          { advisor: Advisor.FOUR, action: Action.MUSTER },
          { advisor: Advisor.TWO, action: Action.ATTACK },
          { advisor: Advisor.THREE_PLUS, action: Action.BUILD },
          { advisor: Advisor.ONE, action: Action.MOVE, coin: true },
          { advisor: Advisor.TWO_PLUS, action: Action.SCHEME },
          { advisor: Advisor.FIVE, action: Action.ATTACK },
        ]
      },
      {
        priority: ActionPriority.BUILD,
        buildOrder: [Structure.MARKET, Structure.STRONGHOLD, Structure.CHURCH],
        actions: [
          { advisor: Advisor.FOUR, action: Action.BUILD },
          { advisor: Advisor.TWO, action: Action.TAX },
          { advisor: Advisor.THREE_PLUS, action: Action.SCHEME },
          { advisor: Advisor.ONE, action: Action.BUILD },
          { advisor: Advisor.TWO_PLUS, action: Action.ATTACK },
          { advisor: Advisor.FIVE, action: Action.MUSTER, coin: true },
        ]
      },
      {
        priority: ActionPriority.TAX,
        buildOrder: [Structure.CHURCH, Structure.MARKET, Structure.STRONGHOLD],
        actions: [
          { advisor: Advisor.FOUR, action: Action.TAX },
          { advisor: Advisor.TWO, action: Action.TAX },
          { advisor: Advisor.THREE_PLUS, action: Action.SCHEME },
          { advisor: Advisor.ONE, action: Action.MOVE },
          { advisor: Advisor.TWO_PLUS, action: Action.MUSTER },
          { advisor: Advisor.FIVE, action: Action.BUILD, coin: true },
        ]
      },
    ]
  },
  {
    id: 3, 
    locationOrder: [Region.POLOTSK, Region.KIEV, Region.PEREYASLAVL, Region.CHERNIGOV, Region.SMOLENSK, Region.NOVGOROD, Region.VOLYN, Region.ROSTOV],
    priorities: [
      {
        priority: ActionPriority.ATTACK_MOVE,
        buildOrder: [Structure.STRONGHOLD, Structure.CHURCH, Structure.MARKET],
        actions: [
          { advisor: Advisor.TWO, action: Action.MOVE },
          { advisor: Advisor.THREE_PLUS, action: Action.ATTACK },
          { advisor: Advisor.TWO_PLUS, action: Action.MUSTER },
          { advisor: Advisor.FOUR, action: Action.MUSTER, coin: true },
          { advisor: Advisor.FIVE, action: Action.ATTACK },
          { advisor: Advisor.ONE, action: Action.SCHEME },
        ]
      },
      {
        priority: ActionPriority.BUILD,
        buildOrder: [Structure.CHURCH, Structure.STRONGHOLD, Structure.MARKET],
        actions: [
          { advisor: Advisor.TWO, action: Action.MOVE },
          { advisor: Advisor.THREE_PLUS, action: Action.TAX },
          { advisor: Advisor.TWO_PLUS, action: Action.MUSTER },
          { advisor: Advisor.FOUR, action: Action.ATTACK, coin: true },
          { advisor: Advisor.FIVE, action: Action.BUILD },
          { advisor: Advisor.ONE, action: Action.SCHEME },
        ]
      },
      {
        priority: ActionPriority.TAX,
        buildOrder: [Structure.MARKET, Structure.CHURCH, Structure.STRONGHOLD],
        actions: [
          { advisor: Advisor.TWO, action: Action.ATTACK },
          { advisor: Advisor.THREE_PLUS, action: Action.MOVE },
          { advisor: Advisor.TWO_PLUS, action: Action.TAX },
          { advisor: Advisor.FOUR, action: Action.BUILD },
          { advisor: Advisor.FIVE, action: Action.TAX },
          { advisor: Advisor.ONE, action: Action.SCHEME, coin: true },
        ]
      },
    ]
  },
  {
    id: 4, 
    locationOrder: [Region.SMOLENSK, Region.POLOTSK, Region.KIEV, Region.CHERNIGOV, Region.NOVGOROD, Region.PEREYASLAVL, Region.ROSTOV, Region.VOLYN],
    priorities: [
      {
        priority: ActionPriority.ATTACK_MOVE,
        buildOrder: [Structure.STRONGHOLD, Structure.CHURCH, Structure.MARKET],
        actions: [
          { advisor: Advisor.THREE_PLUS, action: Action.TAX },
          { advisor: Advisor.FOUR, action: Action.SCHEME },
          { advisor: Advisor.TWO_PLUS, action: Action.MUSTER },
          { advisor: Advisor.TWO, action: Action.ATTACK, coin: true },
          { advisor: Advisor.ONE, action: Action.MOVE },
          { advisor: Advisor.FIVE, action: Action.BUILD },
        ]
      },
      {
        priority: ActionPriority.BUILD,
        buildOrder: [Structure.CHURCH, Structure.STRONGHOLD, Structure.MARKET],
        actions: [
          { advisor: Advisor.THREE_PLUS, action: Action.ATTACK },
          { advisor: Advisor.FOUR, action: Action.BUILD },
          { advisor: Advisor.TWO_PLUS, action: Action.SCHEME },
          { advisor: Advisor.TWO, action: Action.TAX },
          { advisor: Advisor.ONE, action: Action.MUSTER, coin: true },
          { advisor: Advisor.FIVE, action: Action.MOVE },
        ]
      },
      {
        priority: ActionPriority.TAX,
        buildOrder: [Structure.MARKET, Structure.CHURCH, Structure.STRONGHOLD],
        actions: [
          { advisor: Advisor.THREE_PLUS, action: Action.MUSTER },
          { advisor: Advisor.FOUR, action: Action.MOVE },
          { advisor: Advisor.TWO_PLUS, action: Action.SCHEME },
          { advisor: Advisor.TWO, action: Action.BUILD, coin: true },
          { advisor: Advisor.ONE, action: Action.MUSTER },
          { advisor: Advisor.FIVE, action: Action.TAX },
        ]
      },
    ]
  },
  {
    id: 5, 
    locationOrder: [Region.PEREYASLAVL, Region.SMOLENSK, Region.POLOTSK, Region.CHERNIGOV, Region.KIEV, Region.VOLYN, Region.ROSTOV, Region.NOVGOROD],
    priorities: [
      {
        priority: ActionPriority.ATTACK_MOVE,
        buildOrder: [Structure.CHURCH, Structure.STRONGHOLD, Structure.MARKET],
        actions: [
          { advisor: Advisor.TWO_PLUS, action: Action.MUSTER },
          { advisor: Advisor.ONE, action: Action.ATTACK },
          { advisor: Advisor.THREE_PLUS, action: Action.BUILD },
          { advisor: Advisor.FIVE, action: Action.MUSTER },
          { advisor: Advisor.FOUR, action: Action.ATTACK },
          { advisor: Advisor.TWO, action: Action.SCHEME, coin: true },
        ]
      },
      {
        priority: ActionPriority.BUILD,
        buildOrder: [Structure.MARKET, Structure.CHURCH, Structure.STRONGHOLD],
        actions: [
          { advisor: Advisor.TWO_PLUS, action: Action.MOVE },
          { advisor: Advisor.ONE, action: Action.ATTACK },
          { advisor: Advisor.THREE_PLUS, action: Action.TAX },
          { advisor: Advisor.FIVE, action: Action.MUSTER },
          { advisor: Advisor.FOUR, action: Action.ATTACK, coin: true },
          { advisor: Advisor.TWO, action: Action.SCHEME },
        ]
      },
      {
        priority: ActionPriority.TAX,
        buildOrder: [Structure.CHURCH, Structure.MARKET, Structure.STRONGHOLD],
        actions: [
          { advisor: Advisor.TWO_PLUS, action: Action.MOVE },
          { advisor: Advisor.ONE, action: Action.SCHEME },
          { advisor: Advisor.THREE_PLUS, action: Action.TAX },
          { advisor: Advisor.FIVE, action: Action.BUILD },
          { advisor: Advisor.FOUR, action: Action.MUSTER },
          { advisor: Advisor.TWO, action: Action.TAX, coin: true },
        ]
      },
    ]
  },
  {
    id: 6, 
    locationOrder: [Region.POLOTSK, Region.SMOLENSK, Region.KIEV, Region.NOVGOROD, Region.CHERNIGOV, Region.VOLYN, Region.PEREYASLAVL, Region.ROSTOV],
    priorities: [
      {
        priority: ActionPriority.ATTACK_MOVE,
        buildOrder: [Structure.STRONGHOLD, Structure.CHURCH, Structure.MARKET],
        actions: [
          { advisor: Advisor.TWO, action: Action.MOVE },
          { advisor: Advisor.THREE_PLUS, action: Action.ATTACK },
          { advisor: Advisor.FOUR, action: Action.ATTACK },
          { advisor: Advisor.FIVE, action: Action.BUILD, coin: true },
          { advisor: Advisor.ONE, action: Action.MUSTER },
          { advisor: Advisor.TWO_PLUS, action: Action.MUSTER },
        ]
      },
      {
        priority: ActionPriority.BUILD,
        buildOrder: [Structure.CHURCH, Structure.STRONGHOLD, Structure.MARKET],
        actions: [
          { advisor: Advisor.TWO, action: Action.MUSTER },
          { advisor: Advisor.THREE_PLUS, action: Action.TAX },
          { advisor: Advisor.FOUR, action: Action.TAX, coin: true },
          { advisor: Advisor.FIVE, action: Action.BUILD },
          { advisor: Advisor.ONE, action: Action.ATTACK },
          { advisor: Advisor.TWO_PLUS, action: Action.SCHEME },
        ]
      },
      {
        priority: ActionPriority.TAX,
        buildOrder: [Structure.MARKET, Structure.CHURCH, Structure.STRONGHOLD],
        actions: [
          { advisor: Advisor.TWO, action: Action.SCHEME },
          { advisor: Advisor.THREE_PLUS, action: Action.MUSTER },
          { advisor: Advisor.FOUR, action: Action.TAX },
          { advisor: Advisor.FIVE, action: Action.MUSTER },
          { advisor: Advisor.ONE, action: Action.BUILD, coin: true },
          { advisor: Advisor.TWO_PLUS, action: Action.MOVE },
        ]
      },
    ]
  },
  {
    id: 7, 
    locationOrder: [Region.CHERNIGOV, Region.PEREYASLAVL, Region.SMOLENSK, Region.ROSTOV, Region.KIEV, Region.NOVGOROD, Region.POLOTSK, Region.VOLYN],
    priorities: [
      {
        priority: ActionPriority.ATTACK_MOVE,
        buildOrder: [Structure.STRONGHOLD, Structure.CHURCH, Structure.MARKET],
        actions: [
          { advisor: Advisor.ONE, action: Action.MOVE },
          { advisor: Advisor.FIVE, action: Action.MUSTER, coin: true },
          { advisor: Advisor.TWO_PLUS, action: Action.ATTACK },
          { advisor: Advisor.THREE_PLUS, action: Action.BUILD },
          { advisor: Advisor.TWO, action: Action.ATTACK, coin: true },
          { advisor: Advisor.FOUR, action: Action.SCHEME },
        ]
      },
      {
        priority: ActionPriority.BUILD,
        buildOrder: [Structure.MARKET, Structure.CHURCH, Structure.STRONGHOLD],
        actions: [
          { advisor: Advisor.ONE, action: Action.SCHEME, coin: true },
          { advisor: Advisor.FIVE, action: Action.TAX, coin: true },
          { advisor: Advisor.TWO_PLUS, action: Action.MUSTER, coin: true },
          { advisor: Advisor.THREE_PLUS, action: Action.ATTACK },
          { advisor: Advisor.TWO, action: Action.BUILD },
          { advisor: Advisor.FOUR, action: Action.ATTACK },
        ]
      },
      {
        priority: ActionPriority.TAX,
        buildOrder: [Structure.MARKET, Structure.CHURCH, Structure.STRONGHOLD],
        actions: [
          { advisor: Advisor.ONE, action: Action.TAX },
          { advisor: Advisor.FIVE, action: Action.TAX },
          { advisor: Advisor.TWO_PLUS, action: Action.MUSTER, coin: true },
          { advisor: Advisor.THREE_PLUS, action: Action.MOVE },
          { advisor: Advisor.TWO, action: Action.SCHEME },
          { advisor: Advisor.FOUR, action: Action.BUILD, coin: true },
        ]
      },
    ]
  },
  {
    id: 8, 
    locationOrder: [Region.CHERNIGOV, Region.POLOTSK, Region.PEREYASLAVL, Region.KIEV, Region.VOLYN, Region.SMOLENSK, Region.NOVGOROD, Region.ROSTOV],
    priorities: [
      {
        priority: ActionPriority.ATTACK_MOVE,
        buildOrder: [Structure.STRONGHOLD, Structure.CHURCH, Structure.MARKET],
        actions: [
          { advisor: Advisor.TWO, action: Action.MOVE },
          { advisor: Advisor.FIVE, action: Action.TAX, coin: true },
          { advisor: Advisor.ONE, action: Action.SCHEME },
          { advisor: Advisor.TWO_PLUS, action: Action.BUILD },
          { advisor: Advisor.FOUR, action: Action.ATTACK, coin: true },
          { advisor: Advisor.THREE_PLUS, action: Action.ATTACK },
        ]
      },
      {
        priority: ActionPriority.BUILD,
        buildOrder: [Structure.MARKET, Structure.CHURCH, Structure.STRONGHOLD],
        actions: [
          { advisor: Advisor.TWO, action: Action.ATTACK, coin: true },
          { advisor: Advisor.FIVE, action: Action.BUILD, coin: true },
          { advisor: Advisor.ONE, action: Action.MUSTER },
          { advisor: Advisor.TWO_PLUS, action: Action.MOVE },
          { advisor: Advisor.FOUR, action: Action.TAX },
          { advisor: Advisor.THREE_PLUS, action: Action.BUILD },
        ]
      },
      {
        priority: ActionPriority.TAX,
        buildOrder: [Structure.MARKET, Structure.CHURCH, Structure.STRONGHOLD],
        actions: [
          { advisor: Advisor.TWO, action: Action.SCHEME },
          { advisor: Advisor.FIVE, action: Action.TAX },
          { advisor: Advisor.ONE, action: Action.TAX },
          { advisor: Advisor.TWO_PLUS, action: Action.MUSTER, coin: true },
          { advisor: Advisor.FOUR, action: Action.BUILD, coin: true },
          { advisor: Advisor.THREE_PLUS, action: Action.MOVE },
        ]
      },
    ]
  },
  {
    id: 9, 
    locationOrder: [Region.SMOLENSK, Region.NOVGOROD, Region.PEREYASLAVL, Region.KIEV, Region.CHERNIGOV, Region.POLOTSK, Region.ROSTOV, Region.VOLYN],
    priorities: [
      {
        priority: ActionPriority.ATTACK_MOVE,
        buildOrder: [Structure.CHURCH, Structure.STRONGHOLD, Structure.MARKET],
        actions: [
          { advisor: Advisor.ONE, action: Action.TAX },
          { advisor: Advisor.THREE_PLUS, action: Action.MUSTER, coin: true },
          { advisor: Advisor.FOUR, action: Action.MOVE },
          { advisor: Advisor.FIVE, action: Action.ATTACK },
          { advisor: Advisor.TWO_PLUS, action: Action.ATTACK },
          { advisor: Advisor.TWO, action: Action.BUILD, coin: true },
        ]
      },
      {
        priority: ActionPriority.BUILD,
        buildOrder: [Structure.CHURCH, Structure.STRONGHOLD, Structure.MARKET],
        actions: [
          { advisor: Advisor.ONE, action: Action.TAX },
          { advisor: Advisor.THREE_PLUS, action: Action.MOVE },
          { advisor: Advisor.FOUR, action: Action.ATTACK, coin: true },
          { advisor: Advisor.FIVE, action: Action.BUILD },
          { advisor: Advisor.TWO_PLUS, action: Action.BUILD, coin: true },
          { advisor: Advisor.TWO, action: Action.SCHEME },
        ]
      },
      {
        priority: ActionPriority.TAX,
        buildOrder: [Structure.MARKET, Structure.CHURCH, Structure.STRONGHOLD],
        actions: [
          { advisor: Advisor.ONE, action: Action.MOVE },
          { advisor: Advisor.THREE_PLUS, action: Action.TAX },
          { advisor: Advisor.FOUR, action: Action.TAX },
          { advisor: Advisor.FIVE, action: Action.SCHEME },
          { advisor: Advisor.TWO_PLUS, action: Action.BUILD, coin: true },
          { advisor: Advisor.TWO, action: Action.MUSTER, coin: true },
        ]
      },
    ]
  },
  {
    id: 10, 
    locationOrder: [Region.SMOLENSK, Region.KIEV, Region.CHERNIGOV, Region.PEREYASLAVL, Region.POLOTSK, Region.VOLYN, Region.ROSTOV, Region.NOVGOROD],
    priorities: [
      {
        priority: ActionPriority.ATTACK_MOVE,
        buildOrder: [Structure.MARKET, Structure.STRONGHOLD, Structure.CHURCH],
        actions: [
          { advisor: Advisor.TWO_PLUS, action: Action.ATTACK },
          { advisor: Advisor.ONE, action: Action.SCHEME },
          { advisor: Advisor.FOUR, action: Action.MOVE },
          { advisor: Advisor.THREE_PLUS, action: Action.BUILD, coin: true },
          { advisor: Advisor.TWO, action: Action.MUSTER, coin: true },
          { advisor: Advisor.FIVE, action: Action.TAX },
        ]
      },
      {
        priority: ActionPriority.BUILD,
        buildOrder: [Structure.MARKET, Structure.CHURCH, Structure.STRONGHOLD],
        actions: [
          { advisor: Advisor.TWO_PLUS, action: Action.MOVE },
          { advisor: Advisor.ONE, action: Action.SCHEME },
          { advisor: Advisor.FOUR, action: Action.TAX, coin: true },
          { advisor: Advisor.THREE_PLUS, action: Action.ATTACK },
          { advisor: Advisor.TWO, action: Action.BUILD, coin: true },
          { advisor: Advisor.FIVE, action: Action.MUSTER },
        ]
      },
      {
        priority: ActionPriority.TAX,
        buildOrder: [Structure.STRONGHOLD, Structure.CHURCH, Structure.MARKET],
        actions: [
          { advisor: Advisor.TWO_PLUS, action: Action.MOVE },
          { advisor: Advisor.ONE, action: Action.SCHEME },
          { advisor: Advisor.FOUR, action: Action.TAX, coin: true },
          { advisor: Advisor.THREE_PLUS, action: Action.MUSTER },
          { advisor: Advisor.TWO, action: Action.MUSTER },
          { advisor: Advisor.FIVE, action: Action.BUILD, coin: true },
        ]
      },
    ]
  },
  {
    id: 11, 
    locationOrder: [Region.VOLYN, Region.SMOLENSK, Region.PEREYASLAVL, Region.POLOTSK, Region.KIEV, Region.ROSTOV, Region.CHERNIGOV, Region.NOVGOROD],
    priorities: [
      {
        priority: ActionPriority.ATTACK_MOVE,
        buildOrder: [Structure.CHURCH, Structure.STRONGHOLD, Structure.MARKET],
        actions: [
          { advisor: Advisor.THREE_PLUS, action: Action.ATTACK, coin: true },
          { advisor: Advisor.FOUR, action: Action.MUSTER },
          { advisor: Advisor.TWO_PLUS, action: Action.SCHEME },
          { advisor: Advisor.ONE, action: Action.SCHEME },
          { advisor: Advisor.FIVE, action: Action.MOVE },
          { advisor: Advisor.TWO, action: Action.ATTACK, coin: true },
        ]
      },
      {
        priority: ActionPriority.BUILD,
        buildOrder: [Structure.MARKET, Structure.CHURCH, Structure.STRONGHOLD],
        actions: [
          { advisor: Advisor.THREE_PLUS, action: Action.ATTACK },
          { advisor: Advisor.FOUR, action: Action.BUILD, coin: true },
          { advisor: Advisor.TWO_PLUS, action: Action.TAX },
          { advisor: Advisor.ONE, action: Action.MUSTER, coin: true },
          { advisor: Advisor.FIVE, action: Action.TAX },
          { advisor: Advisor.TWO, action: Action.SCHEME },
        ]
      },
      {
        priority: ActionPriority.TAX,
        buildOrder: [Structure.MARKET, Structure.CHURCH, Structure.STRONGHOLD],
        actions: [
          { advisor: Advisor.THREE_PLUS, action: Action.TAX },
          { advisor: Advisor.FOUR, action: Action.TAX },
          { advisor: Advisor.TWO_PLUS, action: Action.MUSTER, coin: true },
          { advisor: Advisor.ONE, action: Action.BUILD },
          { advisor: Advisor.FIVE, action: Action.MOVE },
          { advisor: Advisor.TWO, action: Action.SCHEME, coin: true },
        ]
      },
    ]
  },
  {
    id: 12, 
    locationOrder: [Region.KIEV, Region.CHERNIGOV, Region.ROSTOV, Region.PEREYASLAVL, Region.SMOLENSK, Region.NOVGOROD, Region.VOLYN, Region.POLOTSK],
    priorities: [
      {
        priority: ActionPriority.ATTACK_MOVE,
        buildOrder: [Structure.STRONGHOLD, Structure.CHURCH, Structure.MARKET],
        actions: [
          { advisor: Advisor.TWO, action: Action.MOVE },
          { advisor: Advisor.THREE_PLUS, action: Action.ATTACK, coin: true },
          { advisor: Advisor.ONE, action: Action.MUSTER },
          { advisor: Advisor.FOUR, action: Action.SCHEME, coin: true },
          { advisor: Advisor.FIVE, action: Action.BUILD },
          { advisor: Advisor.TWO_PLUS, action: Action.ATTACK },
        ]
      },
      {
        priority: ActionPriority.BUILD,
        buildOrder: [Structure.STRONGHOLD, Structure.MARKET, Structure.CHURCH],
        actions: [
          { advisor: Advisor.TWO, action: Action.MUSTER },
          { advisor: Advisor.THREE_PLUS, action: Action.ATTACK, coin: true },
          { advisor: Advisor.ONE, action: Action.MOVE },
          { advisor: Advisor.FOUR, action: Action.SCHEME },
          { advisor: Advisor.FIVE, action: Action.BUILD },
          { advisor: Advisor.TWO_PLUS, action: Action.TAX, coin: true },
        ]
      },
      {
        priority: ActionPriority.TAX,
        buildOrder: [Structure.CHURCH, Structure.STRONGHOLD, Structure.MARKET],
        actions: [
          { advisor: Advisor.TWO, action: Action.TAX, coin: true },
          { advisor: Advisor.THREE_PLUS, action: Action.MOVE },
          { advisor: Advisor.ONE, action: Action.SCHEME },
          { advisor: Advisor.FOUR, action: Action.BUILD, coin: true },
          { advisor: Advisor.FIVE, action: Action.MUSTER },
          { advisor: Advisor.TWO_PLUS, action: Action.TAX },
        ]
      },
    ]
  },
  {
    id: 13, 
    locationOrder: [Region.NOVGOROD, Region.ROSTOV, Region.SMOLENSK, Region.CHERNIGOV, Region.PEREYASLAVL, Region.VOLYN, Region.POLOTSK, Region.KIEV],
    priorities: [
      {
        priority: ActionPriority.ATTACK_MOVE,
        buildOrder: [Structure.STRONGHOLD, Structure.CHURCH, Structure.MARKET],
        actions: [
          { advisor: Advisor.TWO, action: Action.MUSTER },
          { advisor: Advisor.THREE_PLUS, action: Action.BUILD, coin: true },
          { advisor: Advisor.TWO_PLUS, action: Action.TAX },
          { advisor: Advisor.ONE, action: Action.MOVE },
          { advisor: Advisor.FIVE, action: Action.ATTACK, coin: true },
          { advisor: Advisor.FOUR, action: Action.SCHEME },
        ]
      },
      {
        priority: ActionPriority.BUILD,
        buildOrder: [Structure.CHURCH, Structure.MARKET, Structure.STRONGHOLD],
        actions: [
          { advisor: Advisor.TWO, action: Action.MOVE },
          { advisor: Advisor.THREE_PLUS, action: Action.ATTACK, coin: true },
          { advisor: Advisor.TWO_PLUS, action: Action.TAX },
          { advisor: Advisor.ONE, action: Action.BUILD },
          { advisor: Advisor.FIVE, action: Action.TAX },
          { advisor: Advisor.FOUR, action: Action.MUSTER, coin: true },
        ]
      },
      {
        priority: ActionPriority.TAX,
        buildOrder: [Structure.MARKET, Structure.CHURCH, Structure.STRONGHOLD],
        actions: [
          { advisor: Advisor.TWO, action: Action.TAX },
          { advisor: Advisor.THREE_PLUS, action: Action.BUILD, coin: true },
          { advisor: Advisor.TWO_PLUS, action: Action.MUSTER, coin: true },
          { advisor: Advisor.ONE, action: Action.MOVE },
          { advisor: Advisor.FIVE, action: Action.TAX },
          { advisor: Advisor.FOUR, action: Action.SCHEME },
        ]
      },
    ]
  },
  {
    id: 14, 
    locationOrder: [Region.NOVGOROD, Region.SMOLENSK, Region.KIEV, Region.PEREYASLAVL, Region.CHERNIGOV, Region.POLOTSK, Region.ROSTOV, Region.VOLYN],
    priorities: [
      {
        priority: ActionPriority.ATTACK_MOVE,
        buildOrder: [Structure.STRONGHOLD, Structure.MARKET, Structure.CHURCH],
        actions: [
          { advisor: Advisor.THREE_PLUS, action: Action.BUILD },
          { advisor: Advisor.ONE, action: Action.MUSTER },
          { advisor: Advisor.FOUR, action: Action.SCHEME, coin: true },
          { advisor: Advisor.FIVE, action: Action.TAX, coin: true },
          { advisor: Advisor.TWO, action: Action.MOVE },
          { advisor: Advisor.TWO_PLUS, action: Action.ATTACK },
        ]
      },
      {
        priority: ActionPriority.BUILD,
        buildOrder: [Structure.CHURCH, Structure.STRONGHOLD, Structure.MARKET],
        actions: [
          { advisor: Advisor.THREE_PLUS, action: Action.BUILD },
          { advisor: Advisor.ONE, action: Action.MUSTER, coin: true },
          { advisor: Advisor.FOUR, action: Action.SCHEME },
          { advisor: Advisor.FIVE, action: Action.ATTACK },
          { advisor: Advisor.TWO, action: Action.BUILD, coin: true },
          { advisor: Advisor.TWO_PLUS, action: Action.TAX },
        ]
      },
      {
        priority: ActionPriority.TAX,
        buildOrder: [Structure.STRONGHOLD, Structure.CHURCH, Structure.MARKET],
        actions: [
          { advisor: Advisor.THREE_PLUS, action: Action.BUILD, coin: true },
          { advisor: Advisor.ONE, action: Action.MUSTER },
          { advisor: Advisor.FOUR, action: Action.SCHEME },
          { advisor: Advisor.FIVE, action: Action.MUSTER },
          { advisor: Advisor.TWO, action: Action.TAX, coin: true },
          { advisor: Advisor.TWO_PLUS, action: Action.SCHEME },
        ]
      },
    ]
  },
  {
    id: 15, 
    locationOrder: [Region.VOLYN, Region.KIEV, Region.SMOLENSK, Region.POLOTSK, Region.NOVGOROD, Region.ROSTOV, Region.CHERNIGOV, Region.PEREYASLAVL],
    priorities: [
      {
        priority: ActionPriority.ATTACK_MOVE,
        buildOrder: [Structure.CHURCH, Structure.STRONGHOLD, Structure.MARKET],
        actions: [
          { advisor: Advisor.TWO_PLUS, action: Action.ATTACK },
          { advisor: Advisor.ONE, action: Action.MUSTER },
          { advisor: Advisor.FIVE, action: Action.MOVE },
          { advisor: Advisor.THREE_PLUS, action: Action.ATTACK },
          { advisor: Advisor.TWO, action: Action.SCHEME },
          { advisor: Advisor.FOUR, action: Action.TAX, coin: true },
        ]
      },
      {
        priority: ActionPriority.BUILD,
        buildOrder: [Structure.CHURCH, Structure.STRONGHOLD, Structure.MARKET],
        actions: [
          { advisor: Advisor.TWO_PLUS, action: Action.ATTACK },
          { advisor: Advisor.ONE, action: Action.SCHEME },
          { advisor: Advisor.FIVE, action: Action.MOVE },
          { advisor: Advisor.THREE_PLUS, action: Action.MUSTER, coin: true },
          { advisor: Advisor.TWO, action: Action.TAX },
          { advisor: Advisor.FOUR, action: Action.BUILD },
        ]
      },
      {
        priority: ActionPriority.TAX,
        buildOrder: [Structure.MARKET, Structure.CHURCH, Structure.STRONGHOLD],
        actions: [
          { advisor: Advisor.TWO_PLUS, action: Action.SCHEME },
          { advisor: Advisor.ONE, action: Action.MUSTER },
          { advisor: Advisor.FIVE, action: Action.TAX },
          { advisor: Advisor.THREE_PLUS, action: Action.TAX },
          { advisor: Advisor.TWO, action: Action.BUILD, coin: true },
          { advisor: Advisor.FOUR, action: Action.MOVE },
        ]
      },
    ]
  },
  {
    id: 16, 
    locationOrder: [Region.PEREYASLAVL, Region.CHERNIGOV, Region.SMOLENSK, Region.POLOTSK, Region.VOLYN, Region.ROSTOV, Region.NOVGOROD, Region.KIEV],
    priorities: [
      {
        priority: ActionPriority.ATTACK_MOVE,
        buildOrder: [Structure.CHURCH, Structure.STRONGHOLD, Structure.MARKET],
        actions: [
          { advisor: Advisor.FOUR, action: Action.ATTACK },
          { advisor: Advisor.FIVE, action: Action.MUSTER },
          { advisor: Advisor.THREE_PLUS, action: Action.BUILD },
          { advisor: Advisor.ONE, action: Action.TAX, coin: true },
          { advisor: Advisor.TWO_PLUS, action: Action.SCHEME },
          { advisor: Advisor.TWO, action: Action.MOVE },
        ]
      },
      {
        priority: ActionPriority.BUILD,
        buildOrder: [Structure.CHURCH, Structure.STRONGHOLD, Structure.MARKET],
        actions: [
          { advisor: Advisor.FOUR, action: Action.BUILD },
          { advisor: Advisor.FIVE, action: Action.BUILD },
          { advisor: Advisor.THREE_PLUS, action: Action.ATTACK, coin: true },
          { advisor: Advisor.ONE, action: Action.TAX },
          { advisor: Advisor.TWO_PLUS, action: Action.MOVE },
          { advisor: Advisor.TWO, action: Action.ATTACK },
        ]
      },
      {
        priority: ActionPriority.TAX,
        buildOrder: [Structure.MARKET, Structure.STRONGHOLD, Structure.CHURCH],
        actions: [
          { advisor: Advisor.FOUR, action: Action.BUILD },
          { advisor: Advisor.FIVE, action: Action.TAX },
          { advisor: Advisor.THREE_PLUS, action: Action.MUSTER, coin: true },
          { advisor: Advisor.ONE, action: Action.MOVE },
          { advisor: Advisor.TWO_PLUS, action: Action.TAX },
          { advisor: Advisor.TWO, action: Action.SCHEME },
        ]
      },
    ]
  },
  {
    id: 17, 
    locationOrder: [Region.POLOTSK, Region.VOLYN, Region.CHERNIGOV, Region.SMOLENSK, Region.KIEV, Region.PEREYASLAVL, Region.NOVGOROD, Region.ROSTOV],
    priorities: [
      {
        priority: ActionPriority.ATTACK_MOVE,
        buildOrder: [Structure.CHURCH, Structure.STRONGHOLD, Structure.MARKET],
        actions: [
          { advisor: Advisor.ONE, action: Action.MOVE },
          { advisor: Advisor.TWO_PLUS, action: Action.SCHEME },
          { advisor: Advisor.TWO, action: Action.SCHEME },
          { advisor: Advisor.THREE_PLUS, action: Action.TAX },
          { advisor: Advisor.FIVE, action: Action.ATTACK },
          { advisor: Advisor.FOUR, action: Action.BUILD, coin: true },
        ]
      },
      {
        priority: ActionPriority.BUILD,
        buildOrder: [Structure.MARKET, Structure.CHURCH, Structure.STRONGHOLD],
        actions: [
          { advisor: Advisor.ONE, action: Action.MUSTER },
          { advisor: Advisor.TWO_PLUS, action: Action.BUILD },
          { advisor: Advisor.TWO, action: Action.TAX },
          { advisor: Advisor.THREE_PLUS, action: Action.TAX },
          { advisor: Advisor.FIVE, action: Action.SCHEME },
          { advisor: Advisor.FOUR, action: Action.ATTACK, coin: true },
        ]
      },
      {
        priority: ActionPriority.TAX,
        buildOrder: [Structure.MARKET, Structure.CHURCH, Structure.STRONGHOLD],
        actions: [
          { advisor: Advisor.ONE, action: Action.MUSTER },
          { advisor: Advisor.TWO_PLUS, action: Action.ATTACK, coin: true },
          { advisor: Advisor.TWO, action: Action.SCHEME },
          { advisor: Advisor.THREE_PLUS, action: Action.TAX },
          { advisor: Advisor.FIVE, action: Action.TAX },
          { advisor: Advisor.FOUR, action: Action.MOVE },
        ]
      },
    ]
  },
  {
    id: 18, 
    locationOrder: [Region.POLOTSK, Region.NOVGOROD, Region.ROSTOV, Region.CHERNIGOV, Region.KIEV, Region.SMOLENSK, Region.VOLYN, Region.PEREYASLAVL],
    priorities: [
      {
        priority: ActionPriority.ATTACK_MOVE,
        buildOrder: [Structure.CHURCH, Structure.STRONGHOLD, Structure.MARKET],
        actions: [
          { advisor: Advisor.ONE, action: Action.SCHEME },
          { advisor: Advisor.TWO_PLUS, action: Action.MUSTER },
          { advisor: Advisor.FIVE, action: Action.BUILD },
          { advisor: Advisor.TWO, action: Action.MOVE },
          { advisor: Advisor.FOUR, action: Action.ATTACK, coin: true },
          { advisor: Advisor.THREE_PLUS, action: Action.TAX },
        ]
      },
      {
        priority: ActionPriority.BUILD,
        buildOrder: [Structure.CHURCH, Structure.MARKET, Structure.STRONGHOLD],
        actions: [
          { advisor: Advisor.ONE, action: Action.MOVE },
          { advisor: Advisor.TWO_PLUS, action: Action.MUSTER },
          { advisor: Advisor.FIVE, action: Action.BUILD },
          { advisor: Advisor.TWO, action: Action.TAX, coin: true },
          { advisor: Advisor.FOUR, action: Action.ATTACK },
          { advisor: Advisor.THREE_PLUS, action: Action.MOVE },
        ]
      },
      {
        priority: ActionPriority.TAX,
        buildOrder: [Structure.MARKET, Structure.CHURCH, Structure.STRONGHOLD],
        actions: [
          { advisor: Advisor.ONE, action: Action.SCHEME },
          { advisor: Advisor.TWO_PLUS, action: Action.MOVE },
          { advisor: Advisor.FIVE, action: Action.SCHEME },
          { advisor: Advisor.TWO, action: Action.BUILD },
          { advisor: Advisor.FOUR, action: Action.TAX, coin: true },
          { advisor: Advisor.THREE_PLUS, action: Action.MUSTER },
        ]
      },
    ]
  },
]

const cardsMap = new Map<number,Card>()
cards.forEach(card => cardsMap.set(card.id, card))

export default {

  /**
   * Get card by id
   * @param id id
   * @returns Card
   */
  get(id: number) : Card {
    return findMandatory(cardsMap, id)
  },

  /**
   * Get all cards
   * @returns cards
   */
  getAll() : Card[] {
    return cards
  },

}
