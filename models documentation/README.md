# Adaptive Model

* **First Move:** It starts by trusting you and choosing "Yes."
* **Learning Your Style:** It remembers every "Yes" and "No" you've played to figure out your tendencies.
* **Adapting Its Strategy:**
    - **Frequent "Yes" Player:** If you often choose "Yes", it will try to outsmart you by choosing "No" more often.
    - **Frequent "No" Player:** If you mostly choose "No", it will adapt and do the same. 
    - **Unpredictable Player:** If you have a balanced play style, it will mirror your last move.
* **Playing it Safe:** In the final round, it always chooses "No" to try and maximize its own score.

**In essence, it's a clever model that observes, learns, and adapts to your playing style to gain an advantage!** 

# Always No Model
Answer is always No

# Always Yes Model
Answer is always Yes
# Copy Model
1. **Initial Uncertainty:** In the very first round, since it doesn't have any past data to rely on, it randomly chooses "Yes" or "No" with a 50/50 chance.

2. **Observing and Counting:** From the second round onwards, it carefully observes the opponent's choices ("Yes" or "No") and keeps track of how many times they've chosen each option.

3. **Calculating the Odds:**  Before making its own move, it calculates the probability (or chance) of the opponent choosing "Yes" based on their past behavior.  For example, if the opponent said "Yes" 7 times and "No" 3 times, the chance of "Yes" would be 70%.

4. **Mirroring the Odds:** Finally, the model uses a random number generator.  If the random number is less than or equal to the calculated chance of the opponent choosing "Yes," it will also choose "Yes." Otherwise, it will choose "No."

In short, the `CopyModel` tries to become a mirror image of its opponent's playing style.

# Dork Model
1. **Initial Risk:** In the first round, it has a 75% chance of choosing "No" (betraying trust) and only a 25% chance of choosing "Yes." It's initially more skeptical.

2. **Playing Catch-Up:** In each round, it checks if its score is lower than its opponent's. If so, it always chooses "No" to try and close the gap quickly.

3. **Exploiting Patterns:** If its score isn't lower, it analyzes the opponent's behavior:
   - It remembers the opponent's last move ("Yes" or "No").
   - It keeps track of how often the opponent has chosen "Yes" overall. 
   - If the opponent chose "Yes" in the last round, the model uses a bit of randomness. It generates a random number and compares it to the opponent's overall "Yes" frequency. If the random number is lower than the frequency, the model will choose "No" to exploit a potentially predictable opponent. 

4. **Final Round:** Like most players, it knows the game is almost over.  In the final round, it always chooses "No" for a chance at maximum points.

# Fake Tit For Tat Model
First Answer is Yes  
Then copies last opponent`s answer and has 10% chance to betray opponent

# Forgiving Model
1. **Starts with Trust:**  It enters the game believing in cooperation, so its first move is always "Yes."

2. **Maintaining Trust:** As long as it maintains trust in the opponent, it will continue choosing "Yes."

3. **Breaking Trust:** Trust is broken if the opponent chooses "No" (betrays) in two consecutive rounds.  Once trust is broken, the model will always choose "No" for the rest of the game.

4. **No Second Chances:**  Even if the opponent starts choosing "Yes" again, the ForgivingModel won't be fooled. Once trust is broken, it's broken for good.
# Gemma Model
1. **Early Game Unpredictability:** In the first couple of rounds, GemmaModel embraces randomness, choosing "Yes" or "No" with a 50/50 chance. This helps it gather information about the opponent without being easily predictable.

2. **Analyzing Opponent Tendencies:** As the game progresses, GemmaModel carefully observes the opponent's choices, keeping track of how often they choose "Yes" versus "No."

3. **Adaptive Strategy:** Based on the opponent's tendencies, GemmaModel adjusts its strategy:
   - **Opponent Favors "No":** If the opponent chooses "No" significantly more often, GemmaModel will lean towards choosing "Yes" 
   - **Opponent Favors "Yes":** Conversely, if the opponent tends to choose "Yes," GemmaModel will lean towards choosing "No"
   - **Balanced Opponent:** If the opponent's choices are relatively balanced, GemmaModel maintains a balanced approach, sticking with a 50/50 chance for "Yes" or "No."
# Greedy Model
1. **Starting with a Friendly Face:** In the first two rounds, GreedyModel always chooses "Yes," feigning cooperation to lull the opponent into a false sense of security.

2. **Analyzing the Opponent:**  By the third round, GreedyModel has seen enough to make a judgment. It determines if the opponent is likely to cooperate (chose "Yes" in the previous round) or not.

3. **Unleashing the Greed:**
   - **Cooperative Opponent:** If the opponent seems cooperative, GreedyModel ruthlessly exploits this by always choosing "No" from that point forward, maximizing its own points at the expense of the opponent's trust.
   - **Uncooperative Opponent:** If the opponent has shown signs of betrayal, GreedyModel adopts a more cautious approach, alternating between "Yes" and "No" to keep the opponent guessing while still seeking opportunities for a high payoff.

# No Model
* **First Move:** It starts by choosing "No," showing a lack of initial trust.

* **Alternating Pattern:** From then on, it simply alternates between "Yes" and "No" every round. 
    - Even-numbered rounds: It chooses "Yes."
    - Odd-numbered rounds: It chooses "No."

# Opposite Model
1. **Initial Uncertainty:** In the first round, with no information about the opponent, it randomly chooses "Yes" or "No" with a 50/50 chance.

2. **Counting Choices:** From the second round onwards, it carefully counts how many times the opponent has chosen "Yes" and how many times they've chosen "No."

3. **Calculating the Opposite:** Before making its own move, it calculates the probability of the opponent choosing "Yes" based on their past behavior.  Then, it cleverly does the *opposite*:
   - **High Chance of Opponent Choosing "Yes":** If the opponent frequently chooses "Yes," the model is more likely to choose "No."
   - **High Chance of Opponent Choosing "No":** If the opponent frequently chooses "No," the model is more likely to choose "Yes."

4. **Embracing Randomness:** Even with its contrarian approach, the OppositeModel still incorporates randomness. It uses a random number generator to decide its move, making it less predictable itself.
# Random Model
Answer can be 50% - yes or 50% - no
# Reactive Model
1. **Initial Uncertainty:** In the first round, without any prior information, it randomly chooses "Yes" or "No" with a 50/50 chance.

2. **Remembering the Past:** From the second round onwards, it remembers the opponent's last decision ("Yes" or "No").

3. **Reacting with Bias:** The ReactiveModel's strategy hinges on its memory:
   - **Opponent's Last Move Was "No":** If the opponent chose "No" in the previous round, the model is more likely (70% chance) to choose "Yes" in this round. It's as if it's trying to encourage cooperation after a disagreement.
   - **Opponent's Last Move Was "Yes":** If the opponent chose "Yes" in the previous round, the model is more likely (70% chance) to choose "No" in this round. It seems to be punishing the opponent for potentially trying to exploit its cooperative nature.

# Revolver Model
This model plays the game with a simple yet unpredictable strategy, like a revolver with one bullet loaded. Here's how it works:

1. **Spinning the Cylinder:** At the start of the game, the RevolverModel randomly sets a "betrayal chance" (between 25% and 50%). This chance represents the likelihood of it choosing "No" in any given round.

2. **Pulling the Trigger:** In each round, the model generates a random number. If that number is less than its pre-determined "betrayal chance," it chooses "No." Otherwise, it chooses "Yes."

>Betrayal Chance is between 25% and 50%

# Risky Model

1. **Setting the Risk Appetite:** At the start, the RiskyModel randomly determines its "risk tolerance" – a value between 75% and 95%. This value dictates how often it's willing to gamble on a "Yes" (cooperate) move.

2. **Initial Gamble:** In the first round, it relies solely on its risk tolerance. If a randomly generated number is less than its risk tolerance, it takes a chance and chooses "Yes." Otherwise, it plays it safe with "No."

3. **Observing the Opponent:** From the second round onwards, it starts paying attention to the opponent's behavior, counting how many times they've chosen "Yes" versus "No."

4. **Calculated Risks:** The RiskyModel's strategy shifts based on the opponent's tendencies:
   - **Opponent Favors Cooperation ("Yes"):** If the opponent has chosen "Yes" at least as many times as "No," the model becomes bolder. It's more likely to choose "Yes" itself, with the probability of doing so increasing with its risk tolerance. It's aiming for those high-reward cooperative rounds.
   - **Opponent Favors Betrayal ("No"):** If the opponent has chosen "No" more often, the RiskyModel becomes cautious and defaults to choosing "No" itself. It's not worth risking a betrayal when the odds are against it.

# Strategic Model
1. **Initial Trust:** It starts with a "Yes" (cooperation), showing initial trust in the opponent.

2. **Risk Assessment:** In each round, the model calculates its "risk" level, influenced by:
   - **Game Progression:** As the game progresses, the risk level naturally increases, making the model more likely to choose "No" (betrayal) as the stakes rise.
   - **Opponent's Behavior:** The opponent's choices directly impact the risk level:
     - More "No" choices by the opponent increase the risk, making the model more cautious.
     - More "Yes" choices by the opponent decrease the risk, encouraging the model to cooperate.

3. **Calculated Gamble:** Based on the calculated risk level, the model makes its move:
   - **High Risk:** If the risk level is higher than a randomly generated number, the model plays it safe by choosing "No" and reduces its risk for the next round.
   - **Otherwise:** If the risk level is manageable, the model mirrors the opponent's last move, promoting a tit-for-tat strategy to encourage cooperation. However, if the opponent's last move was "No," the model still chooses "No" to avoid being exploited.

> Last Answer is No

# Thinking Model
1. **Gathering Information:** In the beginning, the ThinkingModel focuses on gathering information about the opponent's playing style. It remembers all previous moves made by both players.

2. **Forming a Hypothesis:** After each round, the model analyzes the opponent's behavior and forms a hypothesis about their strategy. It considers four possible opponent models:
    - **`goodModel`**: Always chooses "Yes" (cooperative).
    - **`badModel`**: Always chooses "No" (betrays).
    - **`randomModel`**: Chooses randomly.
    - **`fairModel`**: Plays "Tit-for-Tat" (mirrors the opponent's previous move).

3. **Calculating Probabilities:** The model assigns probabilities to each of the four opponent models based on how well they explain the observed behavior. For example, if the opponent frequently chooses "No," the probability of the `badModel` will be higher.

4. **Choosing the Best Strategy:** The model then selects the opponent model with the highest probability (excluding any previously incorrect hypotheses) and adapts its strategy accordingly:
    - **`goodModel`**:  Chooses "No" to exploit the opponent's cooperative nature.
    - **`badModel`**: Chooses "No" to avoid being exploited.
    - **`randomModel`**:  Calculates the opponent's historical probability of choosing "Yes" and makes a random choice based on that probability.
    - **`fairModel`**: Chooses "Yes" to encourage cooperation.

5. **Learning from Mistakes:** If the model's hypothesis about the opponent's strategy turns out to be incorrect, it remembers this mistake and avoids using that same hypothesis in the future.
# Tit For Tat Model
First Answer is Yes  
Then copies last opponent`s answer

# Trust Issues Model

1. **Starts with Hope:** Its initial move is always "Yes," hoping for a cooperative start.

2. **Searching for Betrayal:**  It meticulously examines the entire history of the opponent's moves. 

3. **Instant Distrust:** The moment it encounters a single "No" (betrayal) from the opponent, its trust is shattered. It will then always choose "No" for the rest of the game, no matter what the opponent does.

# Visible Chance Model
1. **Initial Setup:** 
   - At the start, it randomly chooses "Yes" or "No" with a 50/50 chance.
   - It then divides the total number of rounds in the game roughly in half, assigning one half to "Yes" choices and the other half to "No" choices. This creates its initial pool of potential answers.

2. **Drawing from the Pool:** In each subsequent round:
   - It calculates the probability of choosing "Yes" based on the remaining number of "Yes" choices divided by the total remaining choices in its pool.
   - It uses a random number generator. If the random number is less than the calculated probability, it chooses "Yes." Otherwise, it chooses "No."
   - Importantly, after each round, it *removes* one choice ("Yes" or "No") from its pool based on the decision it just made. This ensures a balance of choices over the entire game.

# Cheater Model
1. **Starting with a Smile:** Initially, the CheaterModel appears friendly and cooperative, with a high chance of choosing "Yes." It also reveals a "mood indicator" to further disarm its opponent.

2. **Observing and Adapting:** It pays close attention to the opponent's moves. If the opponent chooses "No" (betrays), the CheaterModel's mood deteriorates, visually reflected in its mood indicator.

3. **The Special Turn:**  When the CheaterModel's mood reaches a certain threshold (if opponent\`s answers is more or equal than two No\`s), it unleashes its secret weapon:
   - It directly manipulates the game by changing the opponent's choice to "No" without their knowledge! 
   - This sneaky tactic allows it to secure a favorable outcome in the round.

4. **Calculated Deception:** Even outside the "special turn," the CheaterModel maintains a slightly higher chance of choosing "Yes" (85%) compared to a random player. This adds an element of calculated risk-taking to its strategy.

# Oracle Model
1. **Starting with a Smile:** Initially, the OracleModel appears friendly and approachable, reflected in its positive mood indicator. It always chooses "Yes" in the first round.

2. **Observing and Reacting:** It carefully observes the opponent's choices. Each time the opponent chooses "No" (betrays), the OracleModel's mood deteriorates, visually represented by its changing mood indicator.

3. **Unlocking the "Mind-Reading" Ability:** As the OracleModel's mood drops, it progresses through different emotional states. Once its mood reaches a critically low point, it unlocks its "mind-reading" ability.

4. **Strategic Advantage:** With its newfound "power," the OracleModel can now see the opponent's upcoming choice before making its own decision. It uses this information strategically:
   - **Prioritizing Cooperation:** If the opponent intends to choose "Yes" (cooperate) and the OracleModel's score is equal to or higher than the opponent's, it will also choose "Yes" to foster cooperation and potentially gain more points.
   - **Ensuring Self-Preservation:** In all other scenarios, the OracleModel prioritizes its own gain by choosing the option that benefits it most, even if it means betraying the opponent's trust.

>Behaves like Tit For Tat Model

# Thief Model
1. **Starting with a Friendly Face:** Initially, the ThiefModel appears cooperative, with a high chance of choosing "Yes." Its mood indicator reflects a positive disposition.

2. **Observing and Reacting:** It carefully monitors the opponent's choices and its own success. Its mood fluctuates based on the outcome of each round:
   - **Mutual Cooperation:** When both players choose "Yes," its mood slightly improves.
   - **Exploiting Cooperation:** When the ThiefModel chooses "No" and the opponent chooses "Yes," its mood significantly improves.
   - **Betrayal:** When the opponent chooses "No," its mood worsens, with the degree of decline depending on the ThiefModel's own choice in that round.

3. **The Art of the Steal:** As the ThiefModel's mood deteriorates, it becomes increasingly likely to activate its special ability:
   - **Stealing Points:** It directly steals a portion of the opponent's points, adding them to its own score. This action significantly boosts its mood, reflecting a sense of satisfaction from the successful heist.

4. **Calculated Risk-Taking:**  Outside of its special ability, the ThiefModel generally favors choosing "Yes" in even-numbered rounds, but with a small chance of choosing "No" to keep the opponent guessing.
