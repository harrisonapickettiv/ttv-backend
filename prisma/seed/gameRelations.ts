import { PrismaClient } from '../../src/generated/prisma/index.js';

type Entity = { id: string };

export async function seedGameRelations(
  prisma: PrismaClient,
  games: Entity[],
  categories: Entity[],
  mechanics: Entity[],
  designers: Entity[]
) {
  console.log('🔗 Linking games to categories, mechanics, and designers...');

  // Helper indices for readability
  const [
    Strategy,
    Party,
    Cooperative,
    Economic,
    WarGame,
    Family,
    Abstract,
    Thematic,
    CardGame,
    Puzzle,
    Adventure,
    EuroGame,
  ] = categories;

  const [
    WorkerPlacement,
    CardDrafting,
    EngineBuilding,
    AreaControl,
    DeckBuilding,
    TilePlacement,
    PatternBuilding,
    DiceRolling,
    HandManagement,
    SetCollection,
    AuctionBidding,
    RouteBuilding,
    VariablePlayerPowers,
    ActionPoints,
    NetworkBuilding,
    PushYourLuck,
    Memory,
    Trading,
  ] = mechanics;

  const [
    ElizabethHargrave,
    JameyStegmaier,
    VlaadaChvatil,
    MattLeacock,
    KlausJurgenWrede,
    AlanRMoon,
    AntoineBauza,
    UweRosenberg,
    StefanFeld,
    ReinerKnizia,
    CoreyKonieczka,
    IsaacChildres,
    AlexanderPfister,
    VitalLacerda,
    RichardGarfield,
    BrunoCathala,
    RobDaviau,
    EricLang,
    RyanLaukat,
    ColeWehrle,
  ] = designers;

  // Link Games to Categories, Mechanics, and Designers
  await Promise.all([
    // Wingspan: Strategy, Euro, Card Drafting, Engine Building, Set Collection
    prisma.gameCategory.create({
      data: { gameId: games[0].id, categoryId: Strategy.id },
    }),
    prisma.gameCategory.create({
      data: { gameId: games[0].id, categoryId: EuroGame.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[0].id, mechanicId: CardDrafting.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[0].id, mechanicId: EngineBuilding.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[0].id, mechanicId: SetCollection.id },
    }),
    prisma.gameDesigner.create({
      data: { gameId: games[0].id, designerId: ElizabethHargrave.id },
    }),

    // Scythe: Strategy, War Game, Area Control, Engine Building, Variable Powers
    prisma.gameCategory.create({
      data: { gameId: games[1].id, categoryId: Strategy.id },
    }),
    prisma.gameCategory.create({
      data: { gameId: games[1].id, categoryId: WarGame.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[1].id, mechanicId: AreaControl.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[1].id, mechanicId: EngineBuilding.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[1].id, mechanicId: VariablePlayerPowers.id },
    }),
    prisma.gameDesigner.create({
      data: { gameId: games[1].id, designerId: JameyStegmaier.id },
    }),

    // Viticulture: Strategy, Economic, Worker Placement
    prisma.gameCategory.create({
      data: { gameId: games[2].id, categoryId: Strategy.id },
    }),
    prisma.gameCategory.create({
      data: { gameId: games[2].id, categoryId: Economic.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[2].id, mechanicId: WorkerPlacement.id },
    }),
    prisma.gameDesigner.create({
      data: { gameId: games[2].id, designerId: JameyStegmaier.id },
    }),

    // Codenames: Party, Family, Pattern Building
    prisma.gameCategory.create({
      data: { gameId: games[3].id, categoryId: Party.id },
    }),
    prisma.gameCategory.create({
      data: { gameId: games[3].id, categoryId: Family.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[3].id, mechanicId: PatternBuilding.id },
    }),
    prisma.gameDesigner.create({
      data: { gameId: games[3].id, designerId: VlaadaChvatil.id },
    }),

    // Pandemic: Cooperative, Hand Management, Action Points, Set Collection
    prisma.gameCategory.create({
      data: { gameId: games[4].id, categoryId: Cooperative.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[4].id, mechanicId: HandManagement.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[4].id, mechanicId: ActionPoints.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[4].id, mechanicId: SetCollection.id },
    }),
    prisma.gameDesigner.create({
      data: { gameId: games[4].id, designerId: MattLeacock.id },
    }),

    // Carcassonne: Family, Strategy, Tile Placement
    prisma.gameCategory.create({
      data: { gameId: games[5].id, categoryId: Family.id },
    }),
    prisma.gameCategory.create({
      data: { gameId: games[5].id, categoryId: Strategy.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[5].id, mechanicId: TilePlacement.id },
    }),
    prisma.gameDesigner.create({
      data: { gameId: games[5].id, designerId: KlausJurgenWrede.id },
    }),

    // Ticket to Ride: Family, Route Building, Set Collection
    prisma.gameCategory.create({
      data: { gameId: games[6].id, categoryId: Family.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[6].id, mechanicId: RouteBuilding.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[6].id, mechanicId: SetCollection.id },
    }),
    prisma.gameDesigner.create({
      data: { gameId: games[6].id, designerId: AlanRMoon.id },
    }),

    // 7 Wonders: Strategy, Card Drafting, Set Collection
    prisma.gameCategory.create({
      data: { gameId: games[7].id, categoryId: Strategy.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[7].id, mechanicId: CardDrafting.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[7].id, mechanicId: SetCollection.id },
    }),
    prisma.gameDesigner.create({
      data: { gameId: games[7].id, designerId: AntoineBauza.id },
    }),

    // Azul: Abstract, Family, Pattern Building, Tile Placement
    prisma.gameCategory.create({
      data: { gameId: games[8].id, categoryId: Abstract.id },
    }),
    prisma.gameCategory.create({
      data: { gameId: games[8].id, categoryId: Family.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[8].id, mechanicId: PatternBuilding.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[8].id, mechanicId: TilePlacement.id },
    }),
    prisma.gameDesigner.create({
      data: { gameId: games[8].id, designerId: ReinerKnizia.id },
    }),

    // Splendor: Strategy, Economic, Engine Building, Set Collection
    prisma.gameCategory.create({
      data: { gameId: games[9].id, categoryId: Strategy.id },
    }),
    prisma.gameCategory.create({
      data: { gameId: games[9].id, categoryId: Economic.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[9].id, mechanicId: EngineBuilding.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[9].id, mechanicId: SetCollection.id },
    }),
    prisma.gameDesigner.create({
      data: { gameId: games[9].id, designerId: ReinerKnizia.id },
    }),

    // Catan: Family, Strategy, Dice Rolling, Trading, Network Building
    prisma.gameCategory.create({
      data: { gameId: games[10].id, categoryId: Family.id },
    }),
    prisma.gameCategory.create({
      data: { gameId: games[10].id, categoryId: Strategy.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[10].id, mechanicId: DiceRolling.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[10].id, mechanicId: Trading.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[10].id, mechanicId: NetworkBuilding.id },
    }),
    prisma.gameDesigner.create({
      data: { gameId: games[10].id, designerId: ReinerKnizia.id },
    }),

    // Terraforming Mars: Strategy, Economic, Card Drafting, Engine Building
    prisma.gameCategory.create({
      data: { gameId: games[11].id, categoryId: Strategy.id },
    }),
    prisma.gameCategory.create({
      data: { gameId: games[11].id, categoryId: Economic.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[11].id, mechanicId: CardDrafting.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[11].id, mechanicId: EngineBuilding.id },
    }),
    prisma.gameDesigner.create({
      data: { gameId: games[11].id, designerId: AlexanderPfister.id },
    }),

    // Gloomhaven: Adventure, Thematic, Hand Management, Variable Powers
    prisma.gameCategory.create({
      data: { gameId: games[12].id, categoryId: Adventure.id },
    }),
    prisma.gameCategory.create({
      data: { gameId: games[12].id, categoryId: Thematic.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[12].id, mechanicId: HandManagement.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[12].id, mechanicId: VariablePlayerPowers.id },
    }),
    prisma.gameDesigner.create({
      data: { gameId: games[12].id, designerId: IsaacChildres.id },
    }),

    // Dominion: Card Game, Strategy, Deck Building, Hand Management
    prisma.gameCategory.create({
      data: { gameId: games[13].id, categoryId: CardGame.id },
    }),
    prisma.gameCategory.create({
      data: { gameId: games[13].id, categoryId: Strategy.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[13].id, mechanicId: DeckBuilding.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[13].id, mechanicId: HandManagement.id },
    }),
    prisma.gameDesigner.create({
      data: { gameId: games[13].id, designerId: ReinerKnizia.id },
    }),

    // King of Tokyo: Family, Party, Dice Rolling, Push Your Luck
    prisma.gameCategory.create({
      data: { gameId: games[14].id, categoryId: Family.id },
    }),
    prisma.gameCategory.create({
      data: { gameId: games[14].id, categoryId: Party.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[14].id, mechanicId: DiceRolling.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[14].id, mechanicId: PushYourLuck.id },
    }),
    prisma.gameDesigner.create({
      data: { gameId: games[14].id, designerId: RichardGarfield.id },
    }),

    // Everdell: Strategy, Family, Worker Placement, Card Drafting
    prisma.gameCategory.create({
      data: { gameId: games[15].id, categoryId: Strategy.id },
    }),
    prisma.gameCategory.create({
      data: { gameId: games[15].id, categoryId: Family.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[15].id, mechanicId: WorkerPlacement.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[15].id, mechanicId: CardDrafting.id },
    }),
    prisma.gameDesigner.create({
      data: { gameId: games[15].id, designerId: RyanLaukat.id },
    }),

    // Sagrada: Puzzle, Family, Dice Rolling, Pattern Building
    prisma.gameCategory.create({
      data: { gameId: games[16].id, categoryId: Puzzle.id },
    }),
    prisma.gameCategory.create({
      data: { gameId: games[16].id, categoryId: Family.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[16].id, mechanicId: DiceRolling.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[16].id, mechanicId: PatternBuilding.id },
    }),
    prisma.gameDesigner.create({
      data: { gameId: games[16].id, designerId: ReinerKnizia.id },
    }),

    // Castles of Burgundy: Strategy, Euro, Dice Rolling, Tile Placement
    prisma.gameCategory.create({
      data: { gameId: games[17].id, categoryId: Strategy.id },
    }),
    prisma.gameCategory.create({
      data: { gameId: games[17].id, categoryId: EuroGame.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[17].id, mechanicId: DiceRolling.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[17].id, mechanicId: TilePlacement.id },
    }),
    prisma.gameDesigner.create({
      data: { gameId: games[17].id, designerId: StefanFeld.id },
    }),

    // Ark Nova: Strategy, Economic, Card Drafting, Hand Management
    prisma.gameCategory.create({
      data: { gameId: games[18].id, categoryId: Strategy.id },
    }),
    prisma.gameCategory.create({
      data: { gameId: games[18].id, categoryId: Economic.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[18].id, mechanicId: CardDrafting.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[18].id, mechanicId: HandManagement.id },
    }),
    prisma.gameDesigner.create({
      data: { gameId: games[18].id, designerId: AlexanderPfister.id },
    }),

    // Root: Strategy, War Game, Area Control, Variable Powers
    prisma.gameCategory.create({
      data: { gameId: games[19].id, categoryId: Strategy.id },
    }),
    prisma.gameCategory.create({
      data: { gameId: games[19].id, categoryId: WarGame.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[19].id, mechanicId: AreaControl.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[19].id, mechanicId: VariablePlayerPowers.id },
    }),
    prisma.gameDesigner.create({
      data: { gameId: games[19].id, designerId: ColeWehrle.id },
    }),

    // Brass Birmingham: Strategy, Economic, Network Building
    prisma.gameCategory.create({
      data: { gameId: games[20].id, categoryId: Strategy.id },
    }),
    prisma.gameCategory.create({
      data: { gameId: games[20].id, categoryId: Economic.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[20].id, mechanicId: NetworkBuilding.id },
    }),
    prisma.gameDesigner.create({
      data: { gameId: games[20].id, designerId: AlexanderPfister.id },
    }),

    // Spirit Island: Cooperative, Strategy, Hand Management, Variable Powers
    prisma.gameCategory.create({
      data: { gameId: games[21].id, categoryId: Cooperative.id },
    }),
    prisma.gameCategory.create({
      data: { gameId: games[21].id, categoryId: Strategy.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[21].id, mechanicId: HandManagement.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[21].id, mechanicId: VariablePlayerPowers.id },
    }),
    prisma.gameDesigner.create({
      data: { gameId: games[21].id, designerId: ReinerKnizia.id },
    }),

    // Agricola: Strategy, Economic, Worker Placement
    prisma.gameCategory.create({
      data: { gameId: games[22].id, categoryId: Strategy.id },
    }),
    prisma.gameCategory.create({
      data: { gameId: games[22].id, categoryId: Economic.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[22].id, mechanicId: WorkerPlacement.id },
    }),
    prisma.gameDesigner.create({
      data: { gameId: games[22].id, designerId: UweRosenberg.id },
    }),

    // Cascadia: Family, Puzzle, Tile Placement, Pattern Building
    prisma.gameCategory.create({
      data: { gameId: games[23].id, categoryId: Family.id },
    }),
    prisma.gameCategory.create({
      data: { gameId: games[23].id, categoryId: Puzzle.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[23].id, mechanicId: TilePlacement.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[23].id, mechanicId: PatternBuilding.id },
    }),
    prisma.gameDesigner.create({
      data: { gameId: games[23].id, designerId: ReinerKnizia.id },
    }),

    // Pandemic Legacy: Cooperative, Thematic, Hand Management, Action Points
    prisma.gameCategory.create({
      data: { gameId: games[24].id, categoryId: Cooperative.id },
    }),
    prisma.gameCategory.create({
      data: { gameId: games[24].id, categoryId: Thematic.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[24].id, mechanicId: HandManagement.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[24].id, mechanicId: ActionPoints.id },
    }),
    prisma.gameDesigner.create({
      data: { gameId: games[24].id, designerId: MattLeacock.id },
    }),
    prisma.gameDesigner.create({
      data: { gameId: games[24].id, designerId: RobDaviau.id },
    }),

    // Twilight Imperium: Strategy, War Game, Thematic, Variable Powers, Area Control
    prisma.gameCategory.create({
      data: { gameId: games[25].id, categoryId: Strategy.id },
    }),
    prisma.gameCategory.create({
      data: { gameId: games[25].id, categoryId: WarGame.id },
    }),
    prisma.gameCategory.create({
      data: { gameId: games[25].id, categoryId: Thematic.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[25].id, mechanicId: VariablePlayerPowers.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[25].id, mechanicId: AreaControl.id },
    }),
    prisma.gameDesigner.create({
      data: { gameId: games[25].id, designerId: CoreyKonieczka.id },
    }),

    // Love Letter: Card Game, Family, Hand Management
    prisma.gameCategory.create({
      data: { gameId: games[26].id, categoryId: CardGame.id },
    }),
    prisma.gameCategory.create({
      data: { gameId: games[26].id, categoryId: Family.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[26].id, mechanicId: HandManagement.id },
    }),
    prisma.gameDesigner.create({
      data: { gameId: games[26].id, designerId: ReinerKnizia.id },
    }),

    // Sushi Go: Card Game, Family, Card Drafting, Set Collection
    prisma.gameCategory.create({
      data: { gameId: games[27].id, categoryId: CardGame.id },
    }),
    prisma.gameCategory.create({
      data: { gameId: games[27].id, categoryId: Family.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[27].id, mechanicId: CardDrafting.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[27].id, mechanicId: SetCollection.id },
    }),
    prisma.gameDesigner.create({
      data: { gameId: games[27].id, designerId: ReinerKnizia.id },
    }),

    // Forbidden Island: Cooperative, Family, Action Points
    prisma.gameCategory.create({
      data: { gameId: games[28].id, categoryId: Cooperative.id },
    }),
    prisma.gameCategory.create({
      data: { gameId: games[28].id, categoryId: Family.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[28].id, mechanicId: ActionPoints.id },
    }),
    prisma.gameDesigner.create({
      data: { gameId: games[28].id, designerId: MattLeacock.id },
    }),

    // Clank!: Adventure, Deck Building, Push Your Luck
    prisma.gameCategory.create({
      data: { gameId: games[29].id, categoryId: Adventure.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[29].id, mechanicId: DeckBuilding.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[29].id, mechanicId: PushYourLuck.id },
    }),
    prisma.gameDesigner.create({
      data: { gameId: games[29].id, designerId: ReinerKnizia.id },
    }),

    // Coup: Card Game, Party, Hand Management
    prisma.gameCategory.create({
      data: { gameId: games[30].id, categoryId: CardGame.id },
    }),
    prisma.gameCategory.create({
      data: { gameId: games[30].id, categoryId: Party.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[30].id, mechanicId: HandManagement.id },
    }),
    prisma.gameDesigner.create({
      data: { gameId: games[30].id, designerId: ReinerKnizia.id },
    }),

    // Concordia: Strategy, Euro, Economic, Hand Management, Network Building
    prisma.gameCategory.create({
      data: { gameId: games[31].id, categoryId: Strategy.id },
    }),
    prisma.gameCategory.create({
      data: { gameId: games[31].id, categoryId: EuroGame.id },
    }),
    prisma.gameCategory.create({
      data: { gameId: games[31].id, categoryId: Economic.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[31].id, mechanicId: HandManagement.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[31].id, mechanicId: NetworkBuilding.id },
    }),
    prisma.gameDesigner.create({
      data: { gameId: games[31].id, designerId: AlexanderPfister.id },
    }),

    // Mysterium: Party, Cooperative
    prisma.gameCategory.create({
      data: { gameId: games[32].id, categoryId: Party.id },
    }),
    prisma.gameCategory.create({
      data: { gameId: games[32].id, categoryId: Cooperative.id },
    }),
    prisma.gameDesigner.create({
      data: { gameId: games[32].id, designerId: ReinerKnizia.id },
    }),

    // Camel Up: Family, Party, Dice Rolling, Push Your Luck
    prisma.gameCategory.create({
      data: { gameId: games[33].id, categoryId: Family.id },
    }),
    prisma.gameCategory.create({
      data: { gameId: games[33].id, categoryId: Party.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[33].id, mechanicId: DiceRolling.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[33].id, mechanicId: PushYourLuck.id },
    }),
    prisma.gameDesigner.create({
      data: { gameId: games[33].id, designerId: ReinerKnizia.id },
    }),

    // Dixit: Family, Party
    prisma.gameCategory.create({
      data: { gameId: games[34].id, categoryId: Family.id },
    }),
    prisma.gameCategory.create({
      data: { gameId: games[34].id, categoryId: Party.id },
    }),
    prisma.gameDesigner.create({
      data: { gameId: games[34].id, designerId: ReinerKnizia.id },
    }),

    // Patchwork: Abstract, Puzzle, Tile Placement, Pattern Building
    prisma.gameCategory.create({
      data: { gameId: games[35].id, categoryId: Abstract.id },
    }),
    prisma.gameCategory.create({
      data: { gameId: games[35].id, categoryId: Puzzle.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[35].id, mechanicId: TilePlacement.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[35].id, mechanicId: PatternBuilding.id },
    }),
    prisma.gameDesigner.create({
      data: { gameId: games[35].id, designerId: UweRosenberg.id },
    }),

    // Hanabi: Cooperative, Card Game, Hand Management, Memory
    prisma.gameCategory.create({
      data: { gameId: games[36].id, categoryId: Cooperative.id },
    }),
    prisma.gameCategory.create({
      data: { gameId: games[36].id, categoryId: CardGame.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[36].id, mechanicId: HandManagement.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[36].id, mechanicId: Memory.id },
    }),
    prisma.gameDesigner.create({
      data: { gameId: games[36].id, designerId: AntoineBauza.id },
    }),

    // Jaipur: Card Game, Strategy, Set Collection, Trading
    prisma.gameCategory.create({
      data: { gameId: games[37].id, categoryId: CardGame.id },
    }),
    prisma.gameCategory.create({
      data: { gameId: games[37].id, categoryId: Strategy.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[37].id, mechanicId: SetCollection.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[37].id, mechanicId: Trading.id },
    }),
    prisma.gameDesigner.create({
      data: { gameId: games[37].id, designerId: ReinerKnizia.id },
    }),

    // Betrayal: Thematic, Adventure, Variable Powers
    prisma.gameCategory.create({
      data: { gameId: games[38].id, categoryId: Thematic.id },
    }),
    prisma.gameCategory.create({
      data: { gameId: games[38].id, categoryId: Adventure.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[38].id, mechanicId: VariablePlayerPowers.id },
    }),
    prisma.gameDesigner.create({
      data: { gameId: games[38].id, designerId: RobDaviau.id },
    }),

    // Small World: Strategy, Area Control, Variable Powers
    prisma.gameCategory.create({
      data: { gameId: games[39].id, categoryId: Strategy.id },
    }),
    prisma.gameCategory.create({
      data: { gameId: games[39].id, categoryId: Family.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[39].id, mechanicId: AreaControl.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[39].id, mechanicId: VariablePlayerPowers.id },
    }),
    prisma.gameDesigner.create({
      data: { gameId: games[39].id, designerId: ReinerKnizia.id },
    }),

    // El Dorado: Family, Adventure, Deck Building, Route Building
    prisma.gameCategory.create({
      data: { gameId: games[40].id, categoryId: Family.id },
    }),
    prisma.gameCategory.create({
      data: { gameId: games[40].id, categoryId: Adventure.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[40].id, mechanicId: DeckBuilding.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[40].id, mechanicId: RouteBuilding.id },
    }),
    prisma.gameDesigner.create({
      data: { gameId: games[40].id, designerId: ReinerKnizia.id },
    }),

    // Century Spice Road: Strategy, Engine Building, Hand Management
    prisma.gameCategory.create({
      data: { gameId: games[41].id, categoryId: Strategy.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[41].id, mechanicId: EngineBuilding.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[41].id, mechanicId: HandManagement.id },
    }),
    prisma.gameDesigner.create({
      data: { gameId: games[41].id, designerId: ReinerKnizia.id },
    }),

    // Santorini: Abstract, Strategy
    prisma.gameCategory.create({
      data: { gameId: games[42].id, categoryId: Abstract.id },
    }),
    prisma.gameCategory.create({
      data: { gameId: games[42].id, categoryId: Strategy.id },
    }),
    prisma.gameDesigner.create({
      data: { gameId: games[42].id, designerId: ReinerKnizia.id },
    }),

    // Kingdomino: Family, Tile Placement, Pattern Building
    prisma.gameCategory.create({
      data: { gameId: games[43].id, categoryId: Family.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[43].id, mechanicId: TilePlacement.id },
    }),
    prisma.gameMechanic.create({
      data: { gameId: games[43].id, mechanicId: PatternBuilding.id },
    }),
    prisma.gameDesigner.create({
      data: { gameId: games[43].id, designerId: BrunoCathala.id },
    }),
  ]);

  console.log('✅ Successfully linked all games to their metadata');
}
