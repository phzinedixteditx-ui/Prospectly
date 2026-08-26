// Security & Anti-Abuse Protection for Prospectly

const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'tempmail.com', 'guerrillamail.com', '10minutemail.com', 'mailinator.com',
  'yopmail.com', 'trashmail.com', 'sharklasers.com', 'dispostable.com',
  'getairmail.com', 'throwawaymail.com', 'nada.ltd', 'inboxkitten.com',
  'fakeinbox.com', 'temp-mail.org', 'tempinbox.com', 'mohmal.com',
  'generator.email', 'crazymailing.com', 'mytemp.email', 'dropmail.me',
  'throwawaymail.com', 'byom.de', 'dayrep.com', 'teleworm.us', 'armyspy.com',
  'cuvox.de', 'fleckens.hu', 'gustr.com', 'jourrapide.com', 'rhyta.com',
  'superrito.com', 'einrot.com', 'zippymail.info', 'trashmail.net'
]);

const DUMMY_EMAIL_PATTERNS = [
  /^teste?@/i,
  /^admin@/i,
  /^asdf/i,
  /^1234/i,
  /^fake/i,
  /^a+@a+\./i,
  /^user@user\./i,
  /^email@email\./i,
  /^xyz/i
];

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export const SecurityService = {
  // Validate real email
  validateEmail(email: string): ValidationResult {
    const clean = email.trim().toLowerCase();
    
    if (!clean || clean.length < 5) {
      return { valid: false, error: 'O e-mail deve ter pelo menos 5 caracteres.' };
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(clean)) {
      return { valid: false, error: 'Por favor, insira um endereço de e-mail válido (ex: seuemail@empresa.com).' };
    }

    const parts = clean.split('@');
    if (parts.length !== 2) {
      return { valid: false, error: 'Formato de e-mail inválido.' };
    }

    const domain = parts[1];

    // Check disposable domains
    if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) {
      return { valid: false, error: 'E-mails temporários / descartáveis não são permitidos por motivos de segurança.' };
    }

    // Check dummy patterns
    for (const pattern of DUMMY_EMAIL_PATTERNS) {
      if (pattern.test(clean)) {
        return { valid: false, error: 'Por favor, informe um e-mail pessoal ou profissional real.' };
      }
    }

    return { valid: true };
  },

  // Validate strong password
  validatePassword(password: string): ValidationResult {
    if (!password || password.length < 6) {
      return { valid: false, error: 'A senha deve conter no mínimo 6 caracteres.' };
    }
    return { valid: true };
  },

  // Generate persistent hardware fingerprint to prevent free trial abuse
  getDeviceFingerprint(): string {
    const existing = localStorage.getItem('prospectly_device_fp');
    if (existing && existing.length >= 16) {
      return existing;
    }

    try {
      const screenDetails = `${window.screen.width}x${window.screen.height}x${window.screen.colorDepth}`;
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      const userAgent = navigator.userAgent || '';
      const hardwareConcurrency = navigator.hardwareConcurrency || 4;
      const rawString = `${screenDetails}_${timeZone}_${userAgent.substring(0, 40)}_${hardwareConcurrency}`;
      
      // Simple stable hash
      let hash = 0;
      for (let i = 0; i < rawString.length; i++) {
        const char = rawString.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0;
      }
      
      const fp = 'fp_' + Math.abs(hash).toString(36) + '_' + Math.random().toString(36).substring(2, 8);
      localStorage.setItem('prospectly_device_fp', fp);
      return fp;
    } catch {
      const fallbackFp = 'fp_' + Math.random().toString(36).substring(2, 12);
      localStorage.setItem('prospectly_device_fp', fallbackFp);
      return fallbackFp;
    }
  },

  // Check if device quota has been reached today across any account
  checkDeviceFreeQuota(): { allowed: boolean; remainingCredits: number; message?: string } {
    const fp = this.getDeviceFingerprint();
    const today = new Date().toISOString().split('T')[0];
    const key = `device_usage_${fp}`;
    
    const saved = localStorage.getItem(key);
    let count = 0;

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.date === today) {
          count = parsed.count || 0;
        }
      } catch {
        count = 0;
      }
    }

    const DAILY_FREE_LIMIT = 5;
    const remaining = Math.max(0, DAILY_FREE_LIMIT - count);

    if (count >= DAILY_FREE_LIMIT) {
      return {
        allowed: false,
        remainingCredits: 0,
        message: 'Você atingiu o limite gratuito de 5 gerações por dia neste dispositivo. Faça upgrade para o plano Pro para ter créditos ilimitados!'
      };
    }

    return { allowed: true, remainingCredits: remaining };
  },

  // Increment device credit usage
  recordDeviceUsage(): void {
    const fp = this.getDeviceFingerprint();
    const today = new Date().toISOString().split('T')[0];
    const key = `device_usage_${fp}`;

    let count = 0;
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.date === today) {
          count = parsed.count || 0;
        }
      } catch {}
    }

    localStorage.setItem(key, JSON.stringify({ date: today, count: count + 1 }));
  }
};
