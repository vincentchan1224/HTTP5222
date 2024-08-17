const express = require("express");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/tapgame", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const playerSchema = new mongoose.Schema({
  playerId: { type: String, default: uuidv4 },
  level: { type: Number, default: 1 },
  exp: { type: Number, default: 0 },
  atk: { type: Number, default: 10 },
  coin: { type: Number, default: 0 },
  fighting: { type: mongoose.Schema.Types.ObjectId, ref: "Monster" },
  image: { type: String },
});

const monsterSchema = new mongoose.Schema({
  monsterId: { type: String, default: uuidv4 },
  name: { type: String },
  image: { type: String },
  level: { type: Number, default: () => Math.floor(Math.random() * 10) + 1 },
  hp: {
    type: Number,
    default: function () {
      return this.level * 50;
    },
  },
  dropExp: {
    type: Number,
    default: function () {
      return this.level * 100;
    },
  },
  dropCoin: {
    type: Number,
    default: function () {
      return this.level * 25;
    },
  },
  alive: { type: Boolean, default: true },
});

const Player = mongoose.model("Player", playerSchema);
const Monster = mongoose.model("Monster", monsterSchema);

// Create a new player
app.post("/api/player", async (req, res) => {
  const images = ["player1.png", "player2.png", "player3.png"];
  const randomImage = images[Math.floor(Math.random() * images.length)];

  const player = new Player({
    ...req.body,
    image: randomImage,
  });

  await player.save();
  res.status(201).send(player);
});

// Get player data by ID
app.get("/api/player/:id", async (req, res) => {
  const player = await Player.findById(req.params.id).populate("fighting");
  res.send(player);
});

// Update player data
app.put("/api/player/:id", async (req, res) => {
  try {
    const player = await Player.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!player) {
      return res.status(404).send({ message: "Player not found" });
    }
    res.send(player);
  } catch (error) {
    res.status(500).send({ message: "Error updating player", error });
  }
});

// Upgrade player's ATK
app.patch("/api/player/:id/upgrade-atk", async (req, res) => {
  const { id } = req.params;
  const upgradeCost = 100;
  const atkIncrease = Math.floor(Math.random() * 5) + 1;

  try {
    const player = await Player.findById(id);
    if (!player) {
      return res.status(404).send({ message: "Player not found" });
    }

    if (player.coin >= upgradeCost) {
      player.atk += atkIncrease;
      player.coin -= upgradeCost;
      await player.save();
      res.send(player);
    } else {
      res.status(400).send({ message: "Not enough coins to upgrade ATK" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "An error occurred while upgrading ATK", error });
  }
});

// Create a new monster
app.post("/api/monster", async (req, res) => {
  const names = ["monster1", "monster2"];
  const randomIndex = Math.floor(Math.random() * names.length);
  const monster = new Monster({
    name: names[randomIndex],
    image: `${names[randomIndex]}.png`,
  });

  await monster.save();
  res.status(201).send(monster);
});

// Get monster data by ID
app.get("/api/monster/:id", async (req, res) => {
  try {
    const monster = await Monster.findById(req.params.id); // Ensure req.params.id is the correct usage
    if (monster) {
      res.send(monster);
    } else {
      res.status(404).send({ message: "Monster not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error retrieving monster", error });
  }
});

// Update monster data
app.put("/api/monster/:id", async (req, res) => {
  const monster = await Monster.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(monster);
});

app.patch("/api/monster/:monsterId/attack/:playerId", async (req, res) => {
  const { monsterId, playerId } = req.params;
  const { atk } = req.body;

  try {
    const monster = await Monster.findById(monsterId);
    if (!monster) {
      return res.status(404).send({ message: "Monster not found" });
    }

    monster.hp -= atk;
    if (monster.hp <= 0) {
      monster.alive = false;
      monster.hp = 0;

      const player = await Player.findById(playerId);
      if (!player) {
        return res.status(404).send({ message: "Player not found" });
      }

      player.exp += monster.dropExp;
      player.coin += monster.dropCoin;
      player.fighting = null; // Reset fighting status after the monster is defeated

      await monster.save();
      await player.save();
      res.send({ monster, player }); // Send both monster and updated player data
    } else {
      await monster.save();
      res.send({ monster });
    }
  } catch (error) {
    res.status(500).send({ message: "An error occurred", error });
  }
});

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server running on port ${port}`));
