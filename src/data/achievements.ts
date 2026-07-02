export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
}

export interface AchievementStatus {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
  condition?: string
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first-login', name: '新手起步', description: '首次登录 StudyPal', icon: '🚀' },
  { id: 'streak-7', name: '连续7天', description: '连续学习7天', icon: '🔥' },
  { id: 'streak-30', name: '学习勇士', description: '连续学习30天', icon: '⚔️' },
  { id: 'level-2', name: '知识学徒', description: '达到等级2', icon: '📚' },
  { id: 'level-3', name: '学习大师', description: '达到等级3', icon: '🎓' },
  { id: 'time-3000', name: '时光旅人', description: '累计学习3000分钟', icon: '⏳' },
]

interface UserStats { streak_days: number; level: number; total_study_minutes: number }

export function checkAchievement(achievementId: string, stats: UserStats): boolean {
  const checks: Record<string, (s: UserStats) => boolean> = {
    'first-login': () => true,
    'streak-7': (s) => s.streak_days >= 7,
    'streak-30': (s) => s.streak_days >= 30,
    'level-2': (s) => s.level >= 2,
    'level-3': (s) => s.level >= 3,
    'time-3000': (s) => s.total_study_minutes >= 3000,
  }
  return checks[achievementId]?.(stats) ?? false
}

export function computeAchievementStatus(stats: UserStats | null): AchievementStatus[] {
  return ACHIEVEMENTS.map((ach) => {
    const unlocked = stats ? checkAchievement(ach.id, stats) : false
    const result: AchievementStatus = { ...ach, unlocked }
    if (!unlocked) {
      if (stats) {
        const conditions: Record<string, string> = {
          'first-login': '注册并登录 StudyPal',
          'streak-7': `连续学习7天（当前${stats.streak_days}天）`,
          'streak-30': `连续学习30天（当前${stats.streak_days}天）`,
          'level-2': `达到等级2（当前等级${stats.level}）`,
          'level-3': `达到等级3（当前等级${stats.level}）`,
          'time-3000': `累计学习3000分钟（当前${stats.total_study_minutes}分钟）`,
        }
        result.condition = conditions[ach.id] || ''
      } else {
        result.condition = '登录后查看进度'
      }
    }
    return result
  })
}
