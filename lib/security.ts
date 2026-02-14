
class SecurityService {
  private failedAttempts: Record<string, number> = {};
  private blockedIPs: Set<string> = new Set();
  
  public logSuspiciousActivity(ip: string): boolean {
    this.failedAttempts[ip] = (this.failedAttempts[ip] || 0) + 1;
    if (this.failedAttempts[ip] >= 3) {
      this.blockedIPs.add(ip);
      return true;
    }
    return false;
  }

  public isBlocked(ip: string): boolean {
    return this.blockedIPs.has(ip);
  }

  public getBlockedIPs(): string[] {
    return Array.from(this.blockedIPs);
  }

  public unblockIP(ip: string): void {
    this.blockedIPs.delete(ip);
    delete this.failedAttempts[ip];
  }
}

export const security = new SecurityService();
