const UNITS = {
  hellenism: {
    title: "ヘレニズム・ローマの思想",
    questions: [
      {
        stem: "ヘレニズム時代には、心の平安である〔〕を目指すエピクロス派が生まれた。",
        blanks: [{ choices: ["アタラクシア", "アパテイア"], correct: 0 }]
      },
      {
        stem: "エピクロスは、苦痛や恐怖から解放された精神的快楽こそが最高の善だとする〔〕を唱えた。",
        blanks: [{ choices: ["禁欲主義", "快楽主義"], correct: 1 }]
      },
      {
        stem: "エピクロスは、公的な生活から離れることを意味する「〔〕生きよ」という言葉を残した。",
        blanks: [{ choices: ["隠れて", "離れて"], correct: 0 }]
      },
      {
        stem: "ストア派の創始者は〔〕である。",
        blanks: [{ choices: ["セネカ", "ゼノン"], correct: 1 }]
      },
      {
        stem: "ストア派は、宇宙の摂理である「〔〕にしたがって生きる」ことを理想とした。",
        blanks: [{ choices: ["自然", "理性"], correct: 0 }]
      },
      {
        stem: "理性によって情念（パトス）を克服し、魂が動揺しない境地を〔〕という。",
        blanks: [{ choices: ["アタラクシア", "アパテイア"], correct: 1 }]
      },
      {
        stem: "ストア派は、理性によって情念を抑える〔〕主義を説いた。",
        blanks: [{ choices: ["快楽", "禁欲"], correct: 1 }]
      },
      {
        stem: "懐疑派は、あらゆることについて真偽の判断を保留する〔〕を説いた。",
        blanks: [{ choices: ["エポケー", "アタラクシア"], correct: 0 }]
      }
    ]
  },
  "judaism-christianity": {
    title: "ユダヤ教・キリスト教",
    questions: [
      {
        stem: "ユダヤ教は、唯一神〔〕との契約に基づき、自らを神に選ばれた民（選民）とする。",
        blanks: [{ choices: ["アッラー", "ヤハウェ"], correct: 1 }]
      },
      {
        stem: "ユダヤ教の聖典は『〔〕』である。",
        blanks: [{ choices: ["旧約聖書", "新約聖書"], correct: 0 }]
      },
      {
        stem: "イエスが説いた、神がすべての人に注ぐ無差別・無償の愛を〔〕という。",
        blanks: [{ choices: ["エロース", "アガペー"], correct: 1 }]
      },
      {
        stem: "イエスは神への愛とともに「自分を愛するようにあなたの〔〕を愛せよ」と説いた。",
        blanks: [{ choices: ["隣人", "同胞"], correct: 0 }]
      },
      {
        stem: "イエスの復活を信じた弟子の代表的な人物は〔〕である。",
        blanks: [{ choices: ["パウロ", "ペテロ"], correct: 1 }]
      },
      {
        stem: "イエスが十字架で死ぬことにより、人類の罪をあがなうことを〔〕という。",
        blanks: [{ choices: ["贖罪", "回心"], correct: 0 }]
      },
      {
        stem: "もとはキリスト教徒を迫害していたが、回心して伝道者となったのは〔〕である。",
        blanks: [{ choices: ["パウロ", "ペテロ"], correct: 0 }]
      },
      {
        stem: "パウロはもともと、ユダヤ教の律法を厳格に守る〔〕派に属していた。",
        blanks: [{ choices: ["サドカイ", "パリサイ"], correct: 1 }]
      },
      {
        stem: "パウロは劇的な宗教的体験である〔〕を経て、キリスト教の伝道に努めた。",
        blanks: [{ choices: ["回心", "贖罪"], correct: 0 }]
      },
      {
        stem: "パウロは、キリスト教の三元徳として、信仰・〔〕・〔〕を挙げた。",
        blanks: [
          { choices: ["希望", "知恵"], correct: 0 },
          { choices: ["正義", "愛"], correct: 1 }
        ]
      }
    ]
  },
  islam: {
    title: "イスラーム",
    questions: [
      {
        stem: "イスラームとは「神への絶対的〔〕」を意味する。",
        blanks: [{ choices: ["服従", "崇拝"], correct: 0 }]
      },
      {
        stem: "イスラームにおける唯一神は〔〕である。",
        blanks: [{ choices: ["ヤハウェ", "アッラー"], correct: 1 }]
      },
      {
        stem: "イスラームの信徒を〔〕という。",
        blanks: [{ choices: ["ムスリム", "イマーム"], correct: 0 }]
      },
      {
        stem: "イスラームの開祖は〔〕である。",
        blanks: [{ choices: ["アッラー", "ムハンマド"], correct: 1 }]
      },
      {
        stem: "イスラームの教典は『〔〕』である。",
        blanks: [{ choices: ["クルアーン", "ハディース"], correct: 0 }]
      },
      {
        stem: "イスラーム法は〔〕とよばれる。",
        blanks: [{ choices: ["スンナ", "シャリーア"], correct: 1 }]
      },
      {
        stem: "イスラームでは、信仰の根幹として〔〕が定められている。",
        blanks: [{ choices: ["五信六行", "六信五行"], correct: 1 }]
      }
    ]
  },
  buddhism: {
    title: "仏教",
    questions: [
      {
        stem: "仏教では、生・老・病・死の根本的な苦しみを〔〕という。",
        blanks: [{ choices: ["四苦", "八苦"], correct: 0 }]
      },
      {
        stem: "四苦八苦の一つで、求めるものが得られない苦しみを〔〕という。",
        blanks: [{ choices: ["愛別離苦", "求不得苦"], correct: 1 }]
      },
      {
        stem: "人生は本質的に苦しみであるという教えを〔〕という。",
        blanks: [{ choices: ["一切皆苦", "諸行無常"], correct: 0 }]
      },
      {
        stem: "すべてのものは原因や条件によって生起し、不変の実体はないという教えを〔〕という。",
        blanks: [{ choices: ["諸行無常", "諸法無我"], correct: 1 }]
      },
      {
        stem: "すべてのものは絶えず変化し、生滅するという教えを〔〕という。",
        blanks: [{ choices: ["諸行無常", "諸法無我"], correct: 0 }]
      },
      {
        stem: "貪（むさぼり）・瞋（いかり）・癡（おろかさ）の三つの根元的な煩悩を〔〕という。",
        blanks: [{ choices: ["三学", "三毒"], correct: 1 }]
      },
      {
        stem: "自己中心的な欲望など、心身を悩ませる精神の働きを〔〕という。",
        blanks: [{ choices: ["煩悩", "無明"], correct: 0 }]
      },
      {
        stem: "煩悩の火が吹き消された、安らぎの理想的な境地を〔〕という。",
        blanks: [{ choices: ["輪廻", "涅槃寂静"], correct: 1 }]
      },
      {
        stem: "生きとし生けるものをいつくしみ、楽を与えることを〔〕という。",
        blanks: [{ choices: ["慈", "悲"], correct: 0 }]
      },
      {
        stem: "生きとし生けるものの苦しみを悲しみ、それを取り除いてやろうとすることを〔〕という。",
        blanks: [{ choices: ["慈", "悲"], correct: 1 }]
      },
      {
        stem: "ウパニシャッド哲学では、宇宙の根源であるブラフマンと、個人を成り立たせるアートマンが一体であるとする〔〕を説く。",
        blanks: [{ choices: ["梵我一如", "涅槃寂静"], correct: 0 }]
      }
    ]
  },
  "chinese-thought": {
    title: "中国思想",
    questions: [
      {
        stem: "孔子とその弟子たちの言行録を『〔〕』という。",
        blanks: [{ choices: ["孟子", "論語"], correct: 1 }]
      },
      {
        stem: "孔子は、親子・兄弟愛を広げた他者への親愛の情を〔〕と定義した。",
        blanks: [{ choices: ["仁", "礼"], correct: 0 }]
      },
      {
        stem: "仁の心が形をとって外にあらわれた社会規範を〔〕という。",
        blanks: [{ choices: ["仁", "礼"], correct: 1 }]
      },
      {
        stem: "孔子は、自分の私利私欲をおさえることを 〔〕とよんだ。",
        blanks: [{ choices: ["忠恕", "克己"], correct: 1 }]
      },
      {
        stem: "感情や欲望を抑えて、社会規範としての礼に従うことを〔〕という。",
        blanks: [{ choices: ["克己復礼", "温故知新"], correct: 0 }]
      },
      {
        stem: "孔子は、仁礼の徳を身につけた君子が国を治めるべきだとする〔〕主義を唱えた。",
        blanks: [{ choices: ["法治", "徳治"], correct: 1 }]
      },
      {
        stem: "孟子は、人は生まれながらに善を行う心を持つという〔〕説を主張した。",
        blanks: [{ choices: ["性善", "性悪"], correct: 0 }]
      },
      {
        stem: "荀子は、人は生まれながらに悪の心を持つという〔〕説を主張した。",
        blanks: [{ choices: ["性善", "性悪"], correct: 1 }]
      },
      {
        stem: "荀子は、政治は礼にもとづいて行われるべきだとする〔〕主義を唱えた。",
        blanks: [{ choices: ["礼治", "徳治"], correct: 0 }]
      },
      {
        stem: "韓非子は、人間を抑えるためには道徳ではなく法によるべきだとする〔〕主義を説いた。",
        blanks: [{ choices: ["徳治", "法治"], correct: 1 }]
      },
      {
        stem: "老子は、すべてのものを生み出す自然の働きを〔〕とよんだ。",
        blanks: [{ choices: ["仁", "道（タオ）"], correct: 1 }]
      },
      {
        stem: "道は対象としてとらえられず、名づけようがないので〔〕といわれる。",
        blanks: [{ choices: ["無", "空"], correct: 0 }]
      },
      {
        stem: "老子は、人と争わず、水のように柔らかく謙虚な態度である〔〕を説いた。",
        blanks: [{ choices: ["無為自然", "柔弱謙下"], correct: 1 }]
      },
      {
        stem: "無理にコントロールせず、自然の流れや本来の姿を受け入れる生き方を〔〕という。",
        blanks: [{ choices: ["無為自然", "柔弱謙下"], correct: 0 }]
      },
      {
        stem: "老子は、理想的な社会として、小規模な国家である〔〕を説いた。",
        blanks: [{ choices: ["大同", "小国寡民"], correct: 1 }]
      },
      {
        stem: "荘子は、ありのままの世界は万物が差別なく同じ価値を持つという〔〕を説いた。",
        blanks: [{ choices: ["万物斉同", "逍遥遊"], correct: 0 }]
      },
      {
        stem: "心を素直にして自然と一つになる境地を〔〕という。",
        blanks: [{ choices: ["胡蝶の夢", "心斎坐忘"], correct: 1 }]
      },
      {
        stem: "自然と一体になり、絶対的自由の境地に遊ぶことを〔〕という。",
        blanks: [{ choices: ["逍遥遊", "万物斉同"], correct: 0 }]
      }
    ]
  }
};
