import { Command, Option } from 'clipanion';
import { createHash } from 'crypto';
import { eq } from 'drizzle-orm';
import { db, cards } from '../../db';
import type { NewCard } from '../../types';

export class AddCardCommand extends Command {
  static paths = [['add-card']];

  name = Option.String('--name', {
    required: true,
    description: 'The name of the card',
  });

  setCode = Option.String('--set-code', {
    required: true,
    description: 'The set code (e.g., M21, WAR)',
  });

  manaCost = Option.String('--mana-cost', {
    description: 'The mana cost (e.g., {1}{W})',
  });

  cmc = Option.String('--cmc', {
    description: 'Converted mana cost (numeric value)',
  });

  type = Option.String('--type', {
    description: 'The card type line (e.g., "Instant")',
  });

  text = Option.String('--text', {
    description: 'The card text/oracle text',
  });

  power = Option.String('--power', {
    description: 'Creature power (for creatures)',
  });

  toughness = Option.String('--toughness', {
    description: 'Creature toughness (for creatures)',
  });

  rarity = Option.String('--rarity', {
    description: 'Card rarity (Common, Uncommon, Rare, Mythic Rare)',
  });

  async execute(): Promise<number> {
    try {
      // Generate card ID using SHA1 hash of setCode + name + imageName
      // Since we don't have imageName, we'll use setCode + name for now
      const cardId = createHash('sha1')
        .update(`${this.setCode}${this.name}`)
        .digest('hex');

      // Check if card already exists
      const existingCard = await db
        .select()
        .from(cards)
        .where(eq(cards.id, cardId));

      if (existingCard.length > 0) {
        this.context.stderr.write(`Card already exists with ID: ${cardId}\n`);
        return 1;
      }

      // Prepare card data
      const cardData: NewCard = {
        id: cardId,
        name: this.name,
        setCode: this.setCode,
        manaCost: this.manaCost,
        cmc: this.cmc ? parseFloat(this.cmc) : undefined,
        type: this.type,
        text: this.text,
        power: this.power,
        toughness: this.toughness,
        rarity: this.rarity,
      };

      // Insert the card
      await db.insert(cards).values(cardData);

      this.context.stdout.write(`Successfully added card "${this.name}" with ID: ${cardId}\n`);
      return 0;

    } catch (error) {
      this.context.stderr.write(`Error adding card: ${error}\n`);
      return 1;
    }
  }
}
