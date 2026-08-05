'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/app/supabase/client'
import { motion } from 'framer-motion'
import {
  Settings,
  Bell,
  Mail as MailIcon,
  Shield,
  Database,
  Save,
  RefreshCw,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'

export default function AdminSettingsPage() {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [settings, setSettings] = useState({
    siteName: 'YENZHEN TAILORING',
    siteDescription: 'Premium Custom Sportswear',
    adminEmail: 'admin@example.com',
    notificationEmail: 'admin@example.com',
  })

  useEffect(() => {
    // Simulate loading settings from DB
    setTimeout(() => setLoading(false), 500)
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      // Placeholder: In production, save settings to a settings table
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (error) {
      console.error('Error saving settings:', error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold gradient-text">
          Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your admin panel and notification preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* General Settings */}
        <Card className="glass-card border-white/5">
          <CardHeader>
            <CardTitle className="font-display text-lg gradient-text flex items-center gap-2">
              <Settings className="h-5 w-5" />
              General
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Site Name</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) =>
                  setSettings({ ...settings, siteName: e.target.value })
                }
                className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Site Description</label>
              <input
                type="text"
                value={settings.siteDescription}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    siteDescription: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </CardContent>
        </Card>

        {/* Email Notifications */}
        <Card className="glass-card border-white/5">
          <CardHeader>
            <CardTitle className="font-display text-lg gradient-text flex items-center gap-2">
              <MailIcon className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Admin Email</label>
              <input
                type="email"
                value={settings.adminEmail}
                onChange={(e) =>
                  setSettings({ ...settings, adminEmail: e.target.value })
                }
                className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Quote Notifications</label>
              <input
                type="email"
                value={settings.notificationEmail}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    notificationEmail: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="glass-card border-white/5 md:col-span-2">
          <CardHeader>
            <CardTitle className="font-display text-lg gradient-text flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security & Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Supabase Connection</p>
                <p className="text-sm text-muted-foreground">
                  Connected to project database
                </p>
              </div>
              <Badge variant="brand">Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Email Service</p>
                <p className="text-sm text-muted-foreground">
                  Configure EMAIL_SERVICE_API_KEY in .env.local
                </p>
              </div>
              <Badge variant="outline">
                {process.env.EMAIL_SERVICE_API_KEY ? 'Configured' : 'Not configured'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">
                  OneDrive Image Links
                </p>
                <p className="text-sm text-muted-foreground">
                  Ensure all gallery/template URLs use direct image links
                </p>
              </div>
              <Badge variant="outline">Manual</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving}>
          <Save className="mr-2 h-4 w-4" />
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  )
}