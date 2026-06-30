const HTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <meta name="description" content="Hermes Family Points - 家庭积分打卡系统，让孩子自主完成任务赚积分 🏆">
  <meta property="og:title" content="Hermes Family Points 🏆">
  <meta property="og:description" content="家庭积分打卡系统，姐姐弟弟自主完成任务赚积分">
  <meta property="og:type" content="website">
  <meta property="og:image" content="https://hermes-family-points.pages.dev/og-image.png">
  <meta name="twitter:card" content="summary">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏆</text></svg>">
  <link rel="manifest" href="data:application/json,{&quot;name&quot;:&quot;Hermes Family Points&quot;,&quot;short_name&quot;:&quot;家庭积分&quot;,&quot;start_url&quot;:&quot;.&quot;,&quot;display&quot;:&quot;standalone&quot;,&quot;background_color&quot;:&quot;#e8edf2&quot;,&quot;theme_color&quot;:&quot;#c9b8e8&quot;,&quot;icons&quot;:[{&quot;src&quot;:&quot;data:image/svg+xml,<svg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 100 100%27><text y=%27.9em%27 font-size=%2790%27>🏆</text></svg>&quot;,&quot;sizes&quot;:&quot;192x192&quot;,&quot;type&quot;:&quot;image/svg+xml&quot;}]}">
  <title>Hermes Family Points 🏆</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    /* ============================================================
       CSS Variables & Theme
       ============================================================ */
    :root {
      --bg: #e8edf2;
      --surface: #f0f4f8;
      --shadow-light: #ffffff;
      --shadow-dark: #bec8d4;
      --text: #2d3436;
      --text-secondary: #636e72;
      --radius: 24px;
      --radius-sm: 16px;
      --radius-xs: 12px;

      --pink: #ffb5c2;
      --pink-dark: #ff8a9e;
      --pink-bg: #fdf0f2;

      --blue: #8ec5e8;
      --blue-dark: #5ba3d4;
      --blue-bg: #f0f7fc;

      --purple: #c9b8e8;
      --purple-dark: #a88bd4;
      --purple-bg: #f5f0fc;

      --green: #7bc8a4;
      --green-dark: #5aaf89;
      --orange: #f5c26b;
      --red: #e88a8a;

      --safe-top: env(safe-area-inset-top, 12px);
      --safe-bottom: env(safe-area-inset-bottom, 12px);
    }

    * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }

    html, body {
      margin: 0; padding: 0;
      height: 100%; overflow: hidden;
      font-family: -apple-system, 'PingFang SC', 'Helvetica Neue', 'Segoe UI', sans-serif;
      background: var(--bg);
      color: var(--text);
      -webkit-font-smoothing: antialiased;
      user-select: none;
    }

    /* ---- Neumorphic Utilities ---- */
    .neu {
      background: var(--surface);
      box-shadow:
        -8px -8px 16px var(--shadow-light),
        8px 8px 16px var(--shadow-dark);
    }
    .neu-inset {
      background: var(--surface);
      box-shadow:
        inset -4px -4px 8px var(--shadow-light),
        inset 4px 4px 8px var(--shadow-dark);
    }
    .neu-pressed {
      box-shadow:
        inset -2px -2px 4px var(--shadow-light),
        inset 2px 2px 4px var(--shadow-dark);
    }
    .neu-btn {
      background: var(--surface);
      box-shadow:
        -4px -4px 10px var(--shadow-light),
        4px 4px 10px var(--shadow-dark);
      transition: all 0.12s ease;
      cursor: pointer;
    }
    .neu-btn:active {
      box-shadow:
        inset -2px -2px 5px var(--shadow-light),
        inset 2px 2px 5px var(--shadow-dark);
      transform: scale(0.96);
    }

    /* ---- Screen System ---- */
    .screen {
      position: fixed; inset: 0;
      display: flex; flex-direction: column;
      transition: opacity 0.35s ease, transform 0.35s ease;
    }
    .screen:not(.active) {
      opacity: 0; pointer-events: none;
      transform: translateY(12px);
    }
    .screen.active {
      opacity: 1; pointer-events: auto;
      transform: translateY(0);
    }

    /* ---- PIN Pad ---- */
    #pin-overlay {
      position: fixed; inset: 0;
      z-index: 100;
      background: rgba(32, 40, 48, 0.6);
      backdrop-filter: blur(12px) saturate(1.2);
      display: flex; align-items: center; justify-content: center;
      transition: opacity 0.25s ease;
    }
    #pin-overlay.hidden { opacity: 0; pointer-events: none; }
    #pin-overlay:not(.hidden) { opacity: 1; }

    .pin-card {
      background: var(--bg);
      border-radius: var(--radius);
      padding: 32px 28px 28px;
      width: 320px; max-width: 88vw;
      box-shadow: -12px -12px 24px rgba(255,255,255,0.5), 12px 12px 24px rgba(0,0,0,0.15);
    }

    .pin-dot {
      width: 16px; height: 16px;
      border-radius: 50%;
      background: var(--surface);
      box-shadow: inset -2px -2px 4px var(--shadow-light), inset 2px 2px 4px var(--shadow-dark);
      transition: all 0.2s ease;
    }
    .pin-dot.filled {
      background: var(--purple-dark);
      box-shadow: none;
      transform: scale(1.15);
    }

    .pin-key {
      width: 68px; height: 68px;
      border-radius: 50%;
      font-size: 26px; font-weight: 600;
      display: flex; align-items: center; justify-content: center;
      color: var(--text);
      background: var(--bg);
      box-shadow:
        -5px -5px 12px var(--shadow-light),
        5px 5px 12px var(--shadow-dark);
      transition: all 0.1s ease;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
    .pin-key:active {
      box-shadow:
        inset -3px -3px 7px var(--shadow-light),
        inset 3px 3px 7px var(--shadow-dark);
      transform: scale(0.92);
    }
    .pin-key.clear { font-size: 20px; color: var(--red); }
    .pin-key.confirm { color: var(--green-dark); font-size: 28px; }

    /* ---- Role Cards ---- */
    .role-card {
      border-radius: var(--radius);
      padding: 28px 24px 24px;
      transition: all 0.2s ease;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      background: var(--surface);
      box-shadow:
        -10px -10px 20px var(--shadow-light),
        10px 10px 20px var(--shadow-dark);
    }
    .role-card:active {
      transform: scale(0.97);
    }
    .role-card .accent-bar {
      position: absolute; top: 0; left: 0; right: 0;
      height: 5px; border-radius: var(--radius) var(--radius) 0 0;
    }

    /* ---- Child Dashboard ---- */
    .points-number {
      font-size: clamp(56px, 15vw, 96px);
      font-weight: 800;
      line-height: 1;
      letter-spacing: -2px;
    }

    .task-btn {
      border-radius: var(--radius-sm);
      padding: 18px 16px;
      text-align: center;
      transition: all 0.15s ease;
      cursor: pointer;
      background: var(--surface);
      box-shadow:
        -5px -5px 12px var(--shadow-light),
        5px 5px 12px var(--shadow-dark);
    }
    .task-btn:active {
      box-shadow:
        inset -3px -3px 7px var(--shadow-light),
        inset 3px 3px 7px var(--shadow-dark);
      transform: scale(0.95);
    }
    .task-btn .icon { font-size: 32px; display: block; margin-bottom: 6px; }
    .task-btn .name { font-size: 14px; font-weight: 600; }
    .task-btn .pts { font-size: 12px; color: var(--text-secondary); }

    /* ---- Log Entry ---- */
    .log-entry {
      display: flex; align-items: center; gap: 12px;
      padding: 12px 16px;
      border-radius: var(--radius-xs);
      background: var(--bg);
      box-shadow: inset -2px -2px 4px var(--shadow-light), inset 2px 2px 4px var(--shadow-dark);
      margin-bottom: 8px;
    }
    .log-entry .pts-badge {
      min-width: 44px; height: 36px;
      border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      font-weight: 700; font-size: 15px;
    }

    /* ---- Parent — Task Editor ---- */
    .task-edit-item {
      display: flex; align-items: center; gap: 10px;
      padding: 12px 14px;
      border-radius: var(--radius-xs);
      background: var(--bg);
      margin-bottom: 8px;
    }
    .task-edit-item input, .task-edit-item select {
      background: transparent;
      border: none; outline: none;
      font-size: 15px;
      color: var(--text);
      padding: 6px 0;
    }
    .task-edit-item input:focus, .task-edit-item select:focus {
      border-bottom: 2px solid var(--purple-dark);
    }

    /* ---- Scroll Area ---- */
    .scroll-area {
      flex: 1; overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      padding: 0 20px var(--safe-bottom);
      scroll-behavior: smooth;
    }
    .scroll-area::-webkit-scrollbar { width: 4px; }
    .scroll-area::-webkit-scrollbar-thumb { background: var(--shadow-dark); border-radius: 4px; }

    /* ---- Animations ---- */
    @keyframes pop-in {
      0% { transform: scale(0.5); opacity: 0; }
      70% { transform: scale(1.08); }
      100% { transform: scale(1); opacity: 1; }
    }
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-8px); }
      40% { transform: translateX(8px); }
      60% { transform: translateX(-6px); }
      80% { transform: translateX(6px); }
    }
    @keyframes float-up {
      0% { transform: translateY(0); opacity: 1; }
      100% { transform: translateY(-60px); opacity: 0; }
    }
    .pop-in { animation: pop-in 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
    .shake { animation: shake 0.4s ease; }

    .float-up {
      position: fixed; z-index: 200;
      font-size: 32px; font-weight: 800;
      pointer-events: none;
      animation: float-up 1s ease-out forwards;
    }

    /* ---- Misc ---- */
    .divider { height: 1px; background: linear-gradient(to right, transparent, var(--shadow-dark), transparent); }
    .badge { border-radius: 10px; padding: 2px 10px; font-size: 12px; font-weight: 600; }

    /* Toast */
    #toast {
      position: fixed; bottom: calc(80px + var(--safe-bottom)); left: 50%; transform: translateX(-50%);
      z-index: 200;
      background: var(--text); color: white;
      padding: 12px 24px; border-radius: 14px;
      font-size: 15px; font-weight: 500;
      box-shadow: 0 8px 24px rgba(0,0,0,0.2);
      transition: all 0.3s ease;
      opacity: 0; pointer-events: none;
      white-space: nowrap;
    }
    #toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
  </style>
</head>
<body>

  <!-- ============================================================
       TOAST
       ============================================================ -->
  <div id="toast"></div>

  <!-- ============================================================
       SCREEN 1 — Role Selection (Home)
       ============================================================ -->
  <div id="screen-home" class="screen active" style="padding-top: var(--safe-top);">

    <!-- Header -->
    <div class="text-center pt-6 pb-4 px-6" style="flex-shrink:0;">
      <div class="text-3xl mb-1">🏆</div>
      <h1 class="text-xl font-bold tracking-tight">Hermes Family Points</h1>
      <p class="text-sm" style="color:var(--text-secondary);">选一个身份开始打卡吧</p>
    </div>

    <!-- Cards -->
    <div class="scroll-area" style="padding-top: 4px;">
      <div class="max-w-sm mx-auto flex flex-col gap-5 pb-6">

        <!-- 姐姐 -->
        <div class="role-card" onclick="showPinPad('姐姐')">
          <div class="accent-bar" style="background:var(--pink);"></div>
          <div class="flex items-center gap-4 pt-1">
            <div class="w-16 h-16 rounded-full flex items-center justify-center text-3xl" style="background:var(--pink-bg);">👧</div>
            <div class="flex-1">
              <div class="text-lg font-bold">姐姐</div>
              <div class="text-sm" style="color:var(--text-secondary);">认真完成任务的每一天</div>
            </div>
            <div style="color:var(--pink-dark); font-size:20px;">›</div>
          </div>
        </div>

        <!-- 弟弟 -->
        <div class="role-card" onclick="showPinPad('弟弟')">
          <div class="accent-bar" style="background:var(--blue);"></div>
          <div class="flex items-center gap-4 pt-1">
            <div class="w-16 h-16 rounded-full flex items-center justify-center text-3xl" style="background:var(--blue-bg);">👦</div>
            <div class="flex-1">
              <div class="text-lg font-bold">弟弟</div>
              <div class="text-sm" style="color:var(--text-secondary);">今天也要努力赚积分哦</div>
            </div>
            <div style="color:var(--blue-dark); font-size:20px;">›</div>
          </div>
        </div>

        <!-- 家长 -->
        <div class="role-card" onclick="showPinPad('家长')">
          <div class="accent-bar" style="background:var(--purple);"></div>
          <div class="flex items-center gap-4 pt-1">
            <div class="w-16 h-16 rounded-full flex items-center justify-center text-3xl" style="background:var(--purple-bg);">👨‍👩‍👧‍👦</div>
            <div class="flex-1">
              <div class="text-lg font-bold">家长</div>
              <div class="text-sm" style="color:var(--text-secondary);">管理任务 · 查看所有记录</div>
            </div>
            <div style="color:var(--purple-dark); font-size:20px;">›</div>
          </div>
        </div>

      </div>
    </div>

    <div class="text-center pb-3" style="flex-shrink:0;">
      <div style="font-size:11px; color:var(--text-secondary); opacity:0.5;">已对接 Cloudflare KV，数据自动跨设备同步</div>
    </div>
  </div>

  <!-- ============================================================
       PIN OVERLAY
       ============================================================ -->
  <div id="pin-overlay" class="hidden">
    <div class="pin-card pop-in">
      <!-- Role indicator -->
      <div class="text-center mb-3">
        <span id="pin-role-icon" class="text-2xl">👧</span>
        <div id="pin-role-name" class="font-bold text-base mt-1">姐姐</div>
      </div>
      <!-- Dots -->
      <div class="flex justify-center gap-4 mb-3">
        <div class="pin-dot" id="pin-dot-0"></div>
        <div class="pin-dot" id="pin-dot-1"></div>
        <div class="pin-dot" id="pin-dot-2"></div>
        <div class="pin-dot" id="pin-dot-3"></div>
      </div>
      <div id="pin-error" class="text-center text-sm mb-2" style="color:var(--red); min-height:22px;"></div>
      <!-- Keypad -->
      <div class="grid grid-cols-3 gap-3 justify-items-center max-w-[240px] mx-auto">
        <div class="pin-key" data-key="1">1</div>
        <div class="pin-key" data-key="2">2</div>
        <div class="pin-key" data-key="3">3</div>
        <div class="pin-key" data-key="4">4</div>
        <div class="pin-key" data-key="5">5</div>
        <div class="pin-key" data-key="6">6</div>
        <div class="pin-key" data-key="7">7</div>
        <div class="pin-key" data-key="8">8</div>
        <div class="pin-key" data-key="9">9</div>
        <div class="pin-key clear" data-key="clear">⌫</div>
        <div class="pin-key" data-key="0">0</div>
        <div class="pin-key confirm" data-key="confirm">✓</div>
      </div>
      <!-- Cancel -->
      <div class="text-center mt-4">
        <button onclick="closePinPad()" class="text-sm" style="color:var(--text-secondary);">取消</button>
      </div>
    </div>
  </div>

  <!-- ============================================================
       SCREEN 2 — Child Dashboard
       ============================================================ -->
  <div id="screen-child" class="screen" style="padding-top: var(--safe-top);">

    <!-- Top bar -->
    <div class="flex items-center justify-between px-5 pt-4 pb-2" style="flex-shrink:0;">
      <div class="flex items-center gap-3">
        <span id="child-icon" class="text-2xl">👧</span>
        <div>
          <div id="child-name" class="font-bold text-lg">姐姐</div>
          <div style="font-size:12px; color:var(--text-secondary);">今天也加油哦！</div>
        </div>
      </div>
      <button onclick="logout()"
        class="neu-btn text-sm px-4 py-2 rounded-xl"
        style="color:var(--text-secondary);">退出</button>
    </div>

    <div class="scroll-area" style="padding-top:4px;">

      <!-- Points Display -->
      <div class="max-w-sm mx-auto text-center pt-3 pb-5">
        <div class="text-xs font-medium mb-1" style="color:var(--text-secondary);">我的积分</div>
        <div id="child-points" class="points-number">0</div>
        <div id="undo-container" class="max-w-sm mx-auto"></div>
        <div class="text-xs mt-1" style="color:var(--text-secondary);">积分</div>
      </div>

      <!-- Goal -->
      <div id="child-goal" class="max-w-sm mx-auto"></div>

      <!-- Quick Tasks -->
      <div class="max-w-sm mx-auto pb-4">
        <div class="text-sm font-semibold mb-3 px-1" style="color:var(--text-secondary);">📋 快捷任务</div>
        <div id="child-tasks" class="grid grid-cols-2 gap-3"></div>
      </div>

      <!-- Points Log -->
      <div class="max-w-sm mx-auto pb-6">
        <div class="text-sm font-semibold mb-3 px-1" style="color:var(--text-secondary);">📜 我的记录</div>
        <div id="child-log"></div>
        <div id="child-log-empty" class="text-center py-6 text-sm" style="color:var(--text-secondary);">还没有记录，快去完成任务吧！🎯</div>
      </div>

    </div>
  </div>

  <!-- ============================================================
       SCREEN 3 — Parent Dashboard
       ============================================================ -->
  <div id="screen-parent" class="screen" style="padding-top: var(--safe-top);">

    <!-- Top bar -->
    <div class="flex items-center justify-between px-5 pt-4 pb-2" style="flex-shrink:0;">
      <div class="flex items-center gap-3">
        <span class="text-2xl">👨‍👩‍👧‍👦</span>
        <div>
          <div class="font-bold text-lg">家长面板</div>
          <div style="font-size:12px; color:var(--text-secondary);">上帝视角 · 管理一切</div>
        </div>
      </div>
      <button onclick="logout()"
        class="neu-btn text-sm px-4 py-2 rounded-xl"
        style="color:var(--text-secondary);">退出</button>
    </div>

    <div class="scroll-area" style="padding-top:4px;">

      <!-- Overview Cards -->
      <div class="max-w-sm mx-auto pb-4">
        <div id="undo-container" class="max-w-sm mx-auto"></div>
        <div class="text-sm font-semibold mb-3 px-1" style="color:var(--text-secondary);">📊 成员总览</div>
        <div id="parent-overview" class="flex flex-col gap-3"></div>
      </div>

      <!-- Monthly Report -->
      <div class="max-w-sm mx-auto pb-4">
        <div class="text-sm font-semibold mb-3 px-1" style="color:var(--text-secondary);">📅 月度报表</div>
        <div id="monthly-report" class="flex flex-col gap-2"></div>
      </div>

      <!-- Manual Points -->
      <div class="max-w-sm mx-auto pb-4">
        <div class="text-sm font-semibold mb-3 px-1" style="color:var(--text-secondary);">✏️ 手动增减</div>
        <div class="neu rounded-2xl p-4" style="background:var(--bg);">
          <div class="flex gap-3 mb-3">
            <select id="parent-target" class="flex-1 neu-inset rounded-xl px-4 py-3 text-sm outline-none appearance-none" style="background:var(--surface);">
              <option value="姐姐">👧 姐姐</option>
              <option value="弟弟">👦 弟弟</option>
            </select>
            <input type="number" id="parent-points-input" value="5"
              class="w-20 neu-inset rounded-xl px-3 py-3 text-sm text-center outline-none" style="background:var(--surface);">
          </div>
          <input type="text" id="parent-note" placeholder="备注（可选）"
            class="w-full neu-inset rounded-xl px-4 py-3 text-sm outline-none mb-3" style="background:var(--surface);">
          <div class="flex gap-3">
            <button onclick="parentAddPoints()" class="flex-1 neu-btn rounded-xl py-3 text-sm font-bold" style="color:var(--green-dark);">➕ 加分</button>
            <button onclick="parentSubtractPoints()" class="flex-1 neu-btn rounded-xl py-3 text-sm font-bold" style="color:var(--red);">➖ 扣分</button>
          </div>
        </div>
      </div>

      <!-- Task Editor -->
      <div class="max-w-sm mx-auto pb-4">
        <div class="text-sm font-semibold mb-3 px-1" style="color:var(--text-secondary);">⚙️ 任务管理</div>
        <div class="neu rounded-2xl p-4" style="background:var(--bg);">
          <!-- Child tabs -->
          <div class="flex gap-2 mb-4">
            <button id="task-tab-姐姐" onclick="switchTaskChild('姐姐')"
              class="flex-1 rounded-xl py-2 text-sm font-bold transition-all"
              style="background:var(--pink-bg);color:var(--pink-dark);">👧 姐姐</button>
            <button id="task-tab-弟弟" onclick="switchTaskChild('弟弟')"
              class="flex-1 rounded-xl py-2 text-sm font-bold transition-all"
              style="background:var(--blue-bg);color:var(--blue-dark);">👦 弟弟</button>
          </div>
          <div id="task-editor-list"></div>
          <button onclick="addTaskRow()" class="w-full mt-2 neu-btn rounded-xl py-3 text-sm font-medium" style="color:var(--blue-dark);">➕ 添加新任务</button>
        </div>
      </div>

      <!-- Points Goal -->
      <div class="max-w-sm mx-auto pb-4">
        <div class="text-sm font-semibold mb-3 px-1" style="color:var(--text-secondary);">🎯 积分目标</div>
        <div class="neu rounded-2xl p-4" style="background:var(--bg);">
          <div class="flex gap-2 mb-3">
            <select id="goal-child" class="flex-1 neu-inset rounded-xl px-3 py-2 text-sm outline-none appearance-none" style="background:var(--surface);">
              <option value="姐姐">👧 姐姐</option>
              <option value="弟弟">👦 弟弟</option>
            </select>
            <input type="number" id="goal-target" value="50" min="1" class="w-20 neu-inset rounded-xl px-3 py-2 text-sm text-center outline-none" style="background:var(--surface);">
          </div>
          <input type="text" id="goal-label" placeholder="目标描述（如：换一个玩具 🧸）" class="w-full neu-inset rounded-xl px-3 py-2 text-sm outline-none mb-3" style="background:var(--surface);">
          <div class="flex gap-2">
            <button onclick="saveGoal()" class="flex-1 neu-btn rounded-xl py-2 text-sm font-bold" style="color:var(--purple-dark);">💾 保存目标</button>
            <button onclick="clearGoal()" class="neu-btn rounded-xl py-2 px-4 text-sm" style="color:var(--red);">清除</button>
          </div>
          <div id="goal-current-status" class="text-xs mt-2 text-center" style="color:var(--text-secondary);"></div>
        </div>
      </div>

      <!-- Data Sync -->
      <div class="max-w-sm mx-auto pb-4">
        <div class="text-sm font-semibold mb-3 px-1" style="color:var(--text-secondary);">🔄 数据同步</div>
        <div class="neu rounded-2xl p-4" style="background:var(--bg);">
          <div class="text-xs mb-3" style="color:var(--text-secondary);">导出数据，然后在另一个设备上导入，即可同步积分和任务</div>
          <div class="flex gap-2 mb-3">
            <button onclick="exportData()" class="flex-1 neu-btn rounded-xl py-2 text-sm font-bold" style="color:var(--blue-dark);">📤 导出数据</button>
            <button onclick="document.getElementById('import-input').click()" class="flex-1 neu-btn rounded-xl py-2 text-sm font-bold" style="color:var(--purple-dark);">📥 导入数据</button>
          </div>
          <input type="file" id="import-input" accept=".json" style="display:none" onchange="importData(event)">
          <div class="divider my-3"></div>
          <div class="text-xs mb-1 font-bold" style="color:var(--text-secondary);">☁️ 云自动同步</div>
          <div class="text-xs" style="color:var(--text-secondary);">已对接 Cloudflare KV，数据自动跨设备同步</div>
        </div>
      </div>

      <!-- All Logs -->
      <div class="max-w-sm mx-auto pb-6">
        <div class="text-sm font-semibold mb-3 px-1" style="color:var(--text-secondary);">📜 全部记录</div>
        <div id="parent-log"></div>
        <div id="parent-log-empty" class="text-center py-6 text-sm" style="color:var(--text-secondary);">还没有任何记录</div>
      </div>

    </div>
  </div>


  <!-- ============================================================
       JAVASCRIPT — App Logic
       ============================================================ -->
  <script>
    (function () {
      'use strict';

      // ----------------------------------------------------------------
      // ① CONFIG — Cloudflare KV API Placeholders (extend later)
      // ----------------------------------------------------------------
      const CF = {
        enabled: true,
        apiUrl: '/api/points',
        async fetchAll() {
          if (!this.enabled) return null;
          try {
            const resp = await fetch(this.apiUrl);
            if (resp.ok) {
              const text = await resp.text();
              return text ? JSON.parse(text) : null;
            }
          } catch (e) { /* fallback to localStorage */ }
          return null;
        },
        async saveAll(data) {
          if (!this.enabled) return;
          try {
            await fetch(this.apiUrl, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
            });
          } catch (e) { /* fallback to localStorage */ }
        }
      };

      // ----------------------------------------------------------------
      // ② DATA LAYER — localStorage with CF KV fallback stub
      // ----------------------------------------------------------------
      const STORAGE_KEY = 'hermes_family_points';
      const DATA_VERSION = 3;

      const DEFAULT_DATA = {
        members: {
          姐姐: {
            pin: '0618', points: 0, logs: [],
            tasksDoneToday: [], tasksDoneDate: '', goal: null,
            tasks: [
              { id: 't1', name: '阅读', points: 5,  icon: '📖' },
              { id: 't2', name: '收玩具', points: 3, icon: '🧸' },
              { id: 't3', name: '写作业', points: 10, icon: '📝' },
              { id: 't4', name: '练琴', points: 5,  icon: '🎹' }
            ]
          },
          弟弟: {
            pin: '0118', points: 0, logs: [],
            tasksDoneToday: [], tasksDoneDate: '', goal: null,
            tasks: [
              { id: 'd1', name: '阅读', points: 5,  icon: '📖' },
              { id: 'd2', name: '收玩具', points: 3, icon: '🧸' },
              { id: 'd3', name: '写作业', points: 10, icon: '📝' },
              { id: 'd4', name: '练琴', points: 5,  icon: '🎹' }
            ]
          },
          家长: { pin: '7322', points: 0, logs: [], tasks: [], tasksDoneToday: [], tasksDoneDate: '', goal: null }
        }
      };

      function loadData() {
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          if (raw) {
            const data = JSON.parse(raw);
            // 加载时清除可能的 _processing 死锁
            delete data._processing;
            for (var _lp in data.members) {
              delete data.members[_lp]._processing;
            }
            // Ensure all members exist (in case new ones added later)
            for (const [name, def] of Object.entries(DEFAULT_DATA.members)) {
              if (!data.members[name]) {
                data.members[name] = JSON.parse(JSON.stringify(def));
              }
            }
            // Ensure every member has all required fields
            for (const [, m] of Object.entries(data.members)) {
              if (!m.tasks) m.tasks = [];
              if (!m.tasksDoneToday) m.tasksDoneToday = [];
              if (!m.tasksDoneDate) m.tasksDoneDate = '';
              if (m.goal === undefined) m.goal = null;
            }
            // Version migration: clear old demo data + update PINs
            if (!data.version || data.version < DATA_VERSION) {
              for (const [name, m] of Object.entries(data.members)) {
                if (name !== '\u5bb6\u957f') {
                  m.points = 0;
                  m.logs = [];
                }
                if (DEFAULT_DATA.members[name]) {
                  m.pin = DEFAULT_DATA.members[name].pin;
                }
                // 清除残留的本机状态（云同步不再同步这些字段）
                m.tasksDoneToday = [];
                m.tasksDoneDate = '';
              }
              data.version = DATA_VERSION;
              localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            }
            return data;
          }
        } catch (e) { /* corrupted data, reset */ }
        return JSON.parse(JSON.stringify(DEFAULT_DATA));
      }

      function saveData() {
        try {
          delete app.data._processing;
          for (var _sp in app.data.members) {
            delete app.data.members[_sp]._processing;
          }
          app.data.version = (app.data.version || 0) + 1;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(app.data));
          CF.saveAll(app.data);
        } catch (e) {
          console.error('saveData error:', e);
        }
      }

      // ----------------------------------------------------------------
      // ③ APP STATE
      // ----------------------------------------------------------------
      const app = {
        data: loadData(),
        currentRole: null,       // '姐姐' | '弟弟' | '家长'
        pinInput: '',
        pinRole: null,
        taskEditCounter: 0,
        taskChild: '姐姐',       // which child's tasks are being edited
        undoInfo: null,
        undoTimer: null,
      };

      // ----------------------------------------------------------------
      // ④ HELPERS
      // ----------------------------------------------------------------
      function $(sel) { return document.querySelector(sel); }
      function $$(sel) { return document.querySelectorAll(sel); }

      function formatTime(ts) {
        const d = new Date(ts);
        return \`\${d.getMonth()+1}月\${d.getDate()}日 \${String(d.getHours()).padStart(2,'0')}:\${String(d.getMinutes()).padStart(2,'0')}\`;
      }

      function getTodayStr() {
        return new Date().toDateString();
      }

      function playTune(type) {
        try {
          var ctx = new (window.AudioContext || window.webkitAudioContext)();
          var osc = ctx.createOscillator();
          var gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          if (type === 'success') {
            osc.frequency.value = 880;
            osc.type = 'sine';
            gain.gain.setValueAtTime(0.25, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.35);
          } else {
            osc.frequency.value = 440;
            osc.type = 'triangle';
            gain.gain.setValueAtTime(0.2, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.2);
          }
        } catch(_) {}
      }

      function getEmoji(name) {
        return { 姐姐: '👧', 弟弟: '👦', 家长: '👨‍👩‍👧‍👦' }[name] || '👤';
      }

      function getAccentColor(name) {
        return { 姐姐: 'var(--pink-dark)', 弟弟: 'var(--blue-dark)', 家长: 'var(--purple-dark)' }[name] || 'var(--text)';
      }

      function getAccentBg(name) {
        return { 姐姐: 'var(--pink-bg)', 弟弟: 'var(--blue-bg)', 家长: 'var(--purple-bg)' }[name] || '#f0f0f0';
      }

      function showToast(msg, duration = 1800) {
        const t = $('#toast');
        t.textContent = msg;
        t.classList.add('show');
        clearTimeout(t._hide);
        t._hide = setTimeout(() => t.classList.remove('show'), duration);
      }

      function showFloatUp(x, y, text, color) {
        const el = document.createElement('div');
        el.className = 'float-up';
        el.textContent = text;
        el.style.left = x + 'px';
        el.style.top = y + 'px';
        el.style.color = color || 'var(--green-dark)';
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 1000);
      }

      // Vibrate on mobile
      function vibrate(ms = 10) {
        try { navigator.vibrate(ms); } catch (_) {}
      }

      // ----------------------------------------------------------------
      // ⑤ SCREEN ROUTER
      // ----------------------------------------------------------------
      function switchScreen(id) {
        $$('.screen').forEach(s => s.classList.remove('active'));
        const el = document.getElementById(id);
        if (el) el.classList.add('active');
      }

      // ----------------------------------------------------------------
      // ⑥ PIN PAD
      // ----------------------------------------------------------------
      window.showPinPad = function (role) {
        app.pinRole = role;
        app.pinInput = '';
        const overlay = $('#pin-overlay');
        overlay.classList.remove('hidden');
        $('#pin-role-icon').textContent = getEmoji(role);
        $('#pin-role-name').textContent = role;
        $('#pin-error').textContent = '';
        updatePinDots();
        // Hide any toast
        $('#toast').classList.remove('show');
      };

      window.closePinPad = function (e) {
        if (e && e.target !== e.currentTarget) return; // only on overlay click
        $('#pin-overlay').classList.add('hidden');
        app.pinInput = '';
        app.pinRole = null;
      };

      function updatePinDots() {
        for (let i = 0; i < 4; i++) {
          const dot = $(\`#pin-dot-\${i}\`);
          if (dot) {
            dot.classList.toggle('filled', i < app.pinInput.length);
          }
        }
      }

      function verifyPin() {
        const role = app.pinRole;
        const member = app.data.members[role];
        if (!member) { showToast('角色不存在'); return; }

        if (app.pinInput === member.pin) {
          // Success
          vibrate(8);
          $('#pin-overlay').classList.add('hidden');
          app.currentRole = role;
          if (role === '家长') {
            renderParentDashboard();
            switchScreen('screen-parent');
          } else {
            renderChildDashboard();
            switchScreen('screen-child');
          }
          app.pinInput = '';
        } else {
          // Wrong PIN
          vibrate(30);
          const errEl = $('#pin-error');
          errEl.textContent = '密码错误，请重试 😅';
          errEl.parentElement.classList.add('shake');
          setTimeout(() => errEl.parentElement.classList.remove('shake'), 400);
          app.pinInput = '';
          updatePinDots();
        }
      }

      // PIN keypad event delegation
      $('#pin-overlay').addEventListener('click', function (e) {
        // If clicking the overlay background (not the card or its children), close
        if (!e.target.closest('.pin-card')) {
          closePinPad();
          return;
        }
        const keyEl = e.target.closest('.pin-key');
        if (!keyEl) return;
        const key = keyEl.dataset.key;
        if (!key) return;

        if (key === 'clear') {
          app.pinInput = app.pinInput.slice(0, -1);
          updatePinDots();
          $('#pin-error').textContent = '';
          vibrate(5);
        } else if (key === 'confirm') {
          if (app.pinInput.length === 4) {
            verifyPin();
          } else {
            $('#pin-error').textContent = '请输入4位密码';
            vibrate(15);
          }
        } else if (/^\\d$/.test(key)) {
          if (app.pinInput.length < 4) {
            app.pinInput += key;
            updatePinDots();
            $('#pin-error').textContent = '';
            vibrate(5);
            // Auto-verify when 4 digits entered
            if (app.pinInput.length === 4) {
              setTimeout(verifyPin, 120);
            }
          }
        }
      });

      // ----------------------------------------------------------------
      // Helper: group logs by month with subtotals
      // ----------------------------------------------------------------
      function groupLogsByMonth(logs) {
        const groups = {};
        // Sort chronologically (oldest first) so months appear in order
        const sorted = [...logs].sort((a, b) => a.timestamp - b.timestamp);
        sorted.forEach(l => {
          const d = new Date(l.timestamp);
          const key = \`\${d.getFullYear()}-\${String(d.getMonth() + 1).padStart(2, '0')}\`;
          const label = \`\${d.getFullYear()}年\${d.getMonth() + 1}月\`;
          if (!groups[key]) groups[key] = { label, logs: [], subtotal: 0 };
          groups[key].logs.push(l);
          groups[key].subtotal += l.points;
        });
        return groups; // { '2026-06': { label: '2026年6月', logs: [...], subtotal: 15 } }
      }

      // ----------------------------------------------------------------
      // Undo system
      // ----------------------------------------------------------------
      function showUndoButton() {
        var container = document.getElementById('undo-container');
        if (!container) return;
        if (!app.undoInfo) { container.innerHTML = ''; return; }
        container.innerHTML = '<button onclick="undoLastAction()" class="neu-btn w-full rounded-xl py-3 mb-3 text-sm font-bold flex items-center justify-center gap-2" style="color:var(--orange);">\\u21a9\️ \\u64a4\\u9500\\u300c' + app.undoInfo.desc + '\\u300d</button>';
      }

      window.undoLastAction = function () {
        if (!app.undoInfo) return;
        var info = app.undoInfo;
        var m = app.data.members[info.member];
        if (!m) return;
        m.points += info.points;
        if (info.logIndex >= 0 && info.logIndex < m.logs.length) {
          m.logs.splice(info.logIndex, 1);
        }
        if (info.desc) {
          var idx = m.tasksDoneToday.findIndex(function(tid) {
            var task = (m.tasks || []).find(function(t) { return t.id === tid; });
            return task && task.name === info.desc;
          });
          if (idx !== -1) m.tasksDoneToday.splice(idx, 1);
        }
        app.undoInfo = null;
        if (app.undoTimer) { clearTimeout(app.undoTimer); app.undoTimer = null; }
        saveData();
        if (app.currentRole === '\\u5bb6\\u957f') {
          renderParentDashboard();
        } else {
          renderChildDashboard();
          renderChildLog(info.member);
        }
        showUndoButton();
        showToast('✅ 已\\u64a4\\u9500');
      };

      // ----------------------------------------------------------------
      // ⑦ CHILD DASHBOARD
      // ----------------------------------------------------------------
      function renderChildDashboard() {
        const role = app.currentRole;
        const member = app.data.members[role];
        if (!member) return;

                $('#child-icon').textContent = getEmoji(role);
        $('#child-name').textContent = role;
        $('#child-points').textContent = member.points;

        // Daily reset
        var todayStr = getTodayStr();
        if (member.tasksDoneDate !== todayStr) {
          member.tasksDoneDate = todayStr;
          member.tasksDoneToday = [];
          saveData();
        }
        var doneSet = new Set(member.tasksDoneToday || []);

        // Goal progress
        var goalContainer = document.getElementById('child-goal');
        if (member.goal && member.goal.target > 0) {
          var prog = Math.min(member.points / member.goal.target, 1);
          var pct = Math.round(prog * 100);
          goalContainer.innerHTML = '<div class="neu rounded-2xl p-4 mb-4" style="background:var(--bg);">' +
            '<div class="text-sm font-semibold mb-1">🎯 我的目标: ' + member.goal.label + '</div>' +
            '<div class="w-full h-3 rounded-full" style="background:var(--shadow-dark);overflow:hidden;">' +
            '<div class="h-full rounded-full transition-all duration-500" style="width:' + pct + '%;background:linear-gradient(90deg,var(--pink),var(--purple));"></div></div>' +
            '<div class="flex justify-between text-xs mt-1" style="color:var(--text-secondary);">' +
            '<span>' + member.points + ' \\u5206</span>' +
            '<span>' + (pct >= 100 ? '🎉 达成！' : member.goal.target + ' \\u5206') + '</span></div></div>';
          goalContainer.style.display = '';
        } else {
          goalContainer.style.display = 'none';
        }

        // Tasks
        var myTasks = member.tasks || [];
        var tasksContainer = $('#child-tasks');
        tasksContainer.innerHTML = myTasks.map(function(t) {
          var done = doneSet.has(t.id);
          return '<div class="task-btn' + (done ? ' opacity-40 pointer-events-none' : '') + '" data-task-id="' + t.id + '">' +
            '<span class="icon">' + t.icon + '</span>' +
            '<span class="name">' + t.name + '</span>' +
            '<span class="pts">' + (done ? '✅ 已做' : '+' + t.points + ' \\u5206') + '</span></div>';
        }).join('');

        // Task click handler — 双重防刷：点击前也检查
        tasksContainer.querySelectorAll('.task-btn:not(.pointer-events-none)').forEach(function(btn) {
          btn.addEventListener('click', function () {
            var taskId = this.dataset.taskId;
            // 调试：点击时打印当前 tasksDoneToday
            // 即时防刷：点下去马上检查是否已完成
            var tsNow = getTodayStr();
            if (member.tasksDoneDate !== tsNow) {
              member.tasksDoneDate = tsNow;
              member.tasksDoneToday = [];
            }
            if ((member.tasksDoneToday || []).indexOf(taskId) !== -1) {
              showToast('⏳ 已完成');
              return;
            }
            var task = myTasks.find(function(t) { return t.id === taskId; });
            if (!task) return;
            // 找到任务后再标记，防止误标
              doChildTask(role, task);
          });
        });

        // Log
        renderChildLog(role);
      }

      function doChildTask(role, taskOrId) {
        var member = app.data.members[role];
        if (!member) return;
        if (member._processing) return;
        member._processing = true;

        try {
          // 1. 终极兼容：无论传进来的是对象还是字符串ID，都能精准找到任务
          var task = null;
          if (typeof taskOrId === 'string') {
            task = (member.tasks || []).find(function(t) { return t.id === taskOrId; });
          } else {
            task = taskOrId;
          }

          if (!task) {
            showToast('❌ 找不到该任务信息');
            return;
          }

          // 2. 强制剥离出数字（防止 AI 弄错字段名，同时兼容 points 和 score）
          var ptsToAdd = parseInt(task.points || task.score || 0, 10);
          if (isNaN(ptsToAdd) || ptsToAdd === 0) {
            showToast('⚠️ 任务积分设置无效，请编辑任务');
            return;
          }

          // 3. 校验今天是否完成过
          var ts = getTodayStr();
          if (member.tasksDoneDate !== ts) {
            member.tasksDoneDate = ts;
            member.tasksDoneToday = [];
          }
          if ((member.tasksDoneToday || []).indexOf(task.id) !== -1) {
            showToast('⏳ 这个任务今天已经完成过了');
            return;
          }

          // 4. 撤销机制
          if (!member.logs) member.logs = [];
          app.undoInfo = { member: role, points: -ptsToAdd, logIndex: member.logs.length, desc: task.name };
          if (app.undoTimer) clearTimeout(app.undoTimer);
          app.undoTimer = setTimeout(function() { app.undoInfo = null; showUndoButton(); }, 10000);
          showUndoButton();

          // 5. 核心暴力加分：强制读取当前分为数字，加上新分
          var oldPts = parseInt(member.points, 10) || 0;
          member.points = oldPts + ptsToAdd;

          // 6. 记录日志和防刷分名单
          member.logs.push({
            timestamp: Date.now(),
            action: task.name,
            points: ptsToAdd,
            by: role,
            note: ''
          });
          member.tasksDoneToday.push(task.id);

          // 7. 保存并渲染界面
          saveData();
          renderChildDashboard();
          renderChildLog(role);

          // 8. 触发飞出特效
          var ptsEl = document.getElementById('child-points');
          if (ptsEl) {
            var rect = ptsEl.getBoundingClientRect();
            var cx = rect.left + rect.width / 2;
            var cy = rect.top + 20;
            showFloatUp(cx - 20, cy, '+' + ptsToAdd, 'var(--green-dark)');
          }

          vibrate(10);
          playTune('success');
          showToast('🎉 ' + task.name + ' +' + ptsToAdd + ' 分！');

        } catch (e) {
          console.error('加分报错:', e);
          showToast('❌ 加分出现异常');
        } finally {
          // 永远保证解锁，永不假死
          member._processing = false;
        }
      }

      function renderChildLog(role) {
        const member = app.data.members[role];
        const logs = member.logs || [];
        const container = $('#child-log');
        const empty = $('#child-log-empty');

        if (logs.length === 0) {
          container.innerHTML = '';
          empty.style.display = 'block';
          return;
        }
        empty.style.display = 'none';

        // Group by day (newest first)
        var dayMap = {};
        logs.forEach(function(l) {
          var d = new Date(l.timestamp);
          var key = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
          var label = d.getMonth()+1 + '月' + d.getDate() + '日';
          if (!dayMap[key]) { dayMap[key] = { label: label, logs: [], subtotal: 0 }; }
          dayMap[key].logs.push(l);
          dayMap[key].subtotal += l.points;
        });
        var days = Object.keys(dayMap).sort().reverse();

        var html = '';
        days.forEach(function(key, i) {
          var g = dayMap[key];
          var subSign = g.subtotal >= 0 ? '+' : '';
          var subColor = g.subtotal >= 0 ? 'var(--green-dark)' : 'var(--red)';
          var collapsed = ' style="display:none;"';
          var arrow = '▶';

          html += '<div class="day-group">';
          html += '<div class="day-header" onclick="toggleDay(this)" style="display:flex;justify-content:space-between;align-items:center;padding:8px 12px;margin:4px 0;border-radius:12px;background:var(--surface);box-shadow:inset -2px -2px 4px var(--shadow-light),inset 2px 2px 4px var(--shadow-dark);cursor:pointer;">';
          html += '<span class="text-xs font-bold" style="color:var(--text-secondary);">📅 ' + g.label + ' <span class="arrow" style="font-size:10px;">' + arrow + '</span></span>';
          html += '<span class="text-xs font-bold" style="color:' + subColor + ';">' + subSign + g.subtotal + ' 分</span>';
          html += '</div>';
          html += '<div class="day-body"' + collapsed + '>';
          g.logs.reverse().forEach(function(l) {
            var isPositive = l.points > 0;
            var whoText = l.by === role ? '自己完成' : (l.points > 0 ? '由家长添加' : '由家长扣除');
            var emoji = isPositive ? '🏅' : '⚠️';
            html += '<div class="log-entry">';
            html += '<div class="pts-badge" style="background:' + (isPositive ? 'var(--green)' : 'var(--red)') + ';color:white;">' + (isPositive ? '+' : '') + l.points + '</div>';
            html += '<div class="flex-1 min-w-0">';
            html += '<div class="font-medium text-sm truncate">' + emoji + ' ' + l.action + '</div>';
            html += '<div class="text-xs" style="color:var(--text-secondary);">' + whoText + (l.note ? ' · ' + l.note : '') + '</div>';
            html += '</div>';
            html += '<div class="text-xs" style="color:var(--text-secondary);flex-shrink:0;">' + formatTime(l.timestamp) + '</div>';
            html += '</div>';
          });
          html += '</div></div>';
        });
        container.innerHTML = html;
      }

      window.toggleDay = function(el) {
        var body = el.nextElementSibling;
        if (body.style.display === 'none') {
          body.style.display = '';
          el.querySelector('.arrow').textContent = '▼';
        } else {
          body.style.display = 'none';
          el.querySelector('.arrow').textContent = '▶';
        }
      };

      // ----------------------------------------------------------------
      // ⑧ PARENT DASHBOARD
      // ----------------------------------------------------------------
      function renderParentDashboard() {
        // Overview cards
        renderParentOverview();

        // Monthly report
        renderMonthlyReport();

        // Goal status
        renderGoalStatus();

        // Logs
        renderParentLog();

        // Task editor
        updateTaskTabs();
        renderTaskEditor();
      }

      function renderParentOverview() {
        const container = $('#parent-overview');
        const children = ['姐姐', '弟弟'];
        const now = new Date();
        const thisMonth = \`\${now.getFullYear()}-\${String(now.getMonth() + 1).padStart(2, '0')}\`;

        container.innerHTML = children.map(name => {
          const m = app.data.members[name];
          const emoji = getEmoji(name);
          const accent = getAccentColor(name);
          const accentBg = getAccentBg(name);
          // Calculate this month's points from logs
          let monthPoints = 0;
          (m.logs || []).forEach(l => {
            const d = new Date(l.timestamp);
            const k = \`\${d.getFullYear()}-\${String(d.getMonth() + 1).padStart(2, '0')}\`;
            if (k === thisMonth) monthPoints += l.points;
          });
          const mSign = monthPoints >= 0 ? '+' : '';
          const mColor = monthPoints >= 0 ? 'var(--green-dark)' : 'var(--red)';
          return \`
            <div class="neu rounded-2xl p-4 flex items-center gap-4">
              <div class="w-12 h-12 rounded-full flex items-center justify-center text-xl" style="background:\${accentBg};">\${emoji}</div>
              <div class="flex-1">
                <div class="font-bold">\${name}</div>
                <div class="points-number text-2xl" style="color:\${accent};">\${m.points}</div>
                <div class="text-xs font-medium" style="color:\${mColor};">本月 \${mSign}\${monthPoints} 分</div>
              </div>
              <div class="flex gap-2">
                <button onclick="parentQuick('\${name}', 5)" class="neu-btn w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold" style="color:var(--green-dark);">+5</button>
                <button onclick="parentQuick('\${name}', -5)" class="neu-btn w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold" style="color:var(--red);">-5</button>
              </div>
            </div>
          \`;
        }).join('');
      }

      // ----------------------------------------------------------------
      // Monthly Report
      // ----------------------------------------------------------------
      function renderMonthlyReport() {
        const container = $('#monthly-report');
        const children = ['姐姐', '弟弟'];

        // Collect per-month per-child totals
        const monthMap = {}; // '2026-06' => { label: '2026年6月', 姐姐: 0, 弟弟: 0 }
        for (const name of children) {
          const m = app.data.members[name];
          (m.logs || []).forEach(l => {
            const d = new Date(l.timestamp);
            const key = \`\${d.getFullYear()}-\${String(d.getMonth() + 1).padStart(2, '0')}\`;
            const label = \`\${d.getFullYear()}年\${d.getMonth() + 1}月\`;
            if (!monthMap[key]) monthMap[key] = { label, 姐姐: 0, 弟弟: 0 };
            monthMap[key][name] += l.points;
          });
        }

        const sortedMonths = Object.keys(monthMap).sort().reverse();

        if (sortedMonths.length === 0) {
          container.innerHTML = '<div class="text-center py-4 text-sm" style="color:var(--text-secondary);">暂无数据</div>';
          return;
        }

        container.innerHTML = sortedMonths.map(key => {
          const row = monthMap[key];
          const ptsColor = (val) => val >= 0 ? 'var(--green-dark)' : 'var(--red)';
          const ptsSign = (val) => val >= 0 ? '+' : '';
          return \`
            <div class="neu rounded-xl p-3">
              <div class="text-xs font-bold mb-2" style="color:var(--text-secondary);">📅 \${row.label}</div>
              <div class="flex gap-4">
                <div class="flex-1 flex items-center gap-2">
                  <span>👧</span>
                  <span class="text-sm font-bold" style="color:\${ptsColor(row['姐姐'])};">\${ptsSign(row['姐姐'])}\${row['姐姐']} 分</span>
                </div>
                <div class="flex-1 flex items-center gap-2">
                  <span>👦</span>
                  <span class="text-sm font-bold" style="color:\${ptsColor(row['弟弟'])};">\${ptsSign(row['弟弟'])}\${row['弟弟']} 分</span>
                </div>
              </div>
            </div>
          \`;
        }).join('');
      }

      window.parentQuick = function (name, delta) {
        var m = app.data.members[name];
        if (!m) return;

        app.undoInfo = { member: name, points: -delta, logIndex: m.logs.length, desc: delta > 0 ? '奖励' : '扣分' };
        if (app.undoTimer) clearTimeout(app.undoTimer);
        app.undoTimer = setTimeout(function() { app.undoInfo = null; }, 10000);
        showUndoButton();

        m.points += delta;
        m.logs.push({
          timestamp: Date.now(),
          action: delta > 0 ? '奖励' : '扣分',
          points: delta,
          by: '家长',
          note: '家长手动'
        });
        saveData();
        showToast(\`\${delta > 0 ? '✅' : '⚠️'} \${name} \${delta > 0 ? '+' : ''}\${delta} 分\`);
        // Float-up animation on the points number
        const overviewCards = $$('#parent-overview .neu');
        overviewCards.forEach(card => {
          if (card.textContent.includes(name)) {
            const ptsEl = card.querySelector('.points-number');
            if (ptsEl) {
              const rect = ptsEl.getBoundingClientRect();
              const cx = rect.left + rect.width / 2;
              const cy = rect.top + 10;
              showFloatUp(cx - 20, cy, \`\${delta > 0 ? '+' : ''}\${delta}\`, delta > 0 ? 'var(--green-dark)' : 'var(--red)');
            }
          }
        });
        renderParentOverview();
        renderMonthlyReport();
        renderParentLog();
      };

      window.parentAddPoints = function () {
        var name = $('#parent-target').value;
        var val = parseInt($('#parent-points-input').value) || 0;
        if (val <= 0) { showToast('请输入正数加分'); return; }
        var note = $('#parent-note').value.trim();
        var m = app.data.members[name];

        app.undoInfo = { member: name, points: -val, logIndex: m.logs.length, desc: '家长加分' };
        if (app.undoTimer) clearTimeout(app.undoTimer);
        app.undoTimer = setTimeout(function() { app.undoInfo = null; }, 10000);

        m.points += val;
        m.logs.push({
          timestamp: Date.now(),
          action: '家长加分',
          points: val,
          by: '家长',
          note: note || ''
        });
        saveData();
        $('#parent-note').value = '';
        showToast(\`✅ \${name} +\${val} 分\${note ? '（'+note+'）' : ''}\`);
        renderParentOverview();
        renderMonthlyReport();
        renderParentLog();
      };

      window.parentSubtractPoints = function () {
        var name = $('#parent-target').value;
        var val = parseInt($('#parent-points-input').value) || 0;
        if (val <= 0) { showToast('请输入正数扣分'); return; }
        var note = $('#parent-note').value.trim();
        var m = app.data.members[name];

        app.undoInfo = { member: name, points: val, logIndex: m.logs.length, desc: '家长扣分' };
        if (app.undoTimer) clearTimeout(app.undoTimer);
        app.undoTimer = setTimeout(function() { app.undoInfo = null; }, 10000);

        m.points -= val;  // subtract
        m.logs.push({
          timestamp: Date.now(),
          action: '家长扣分',
          points: -val,
          by: '家长',
          note: note || ''
        });
        saveData();
        $('#parent-note').value = '';
        showToast(\`⚠️ \${name} -\${val} 分\${note ? '（'+note+'）' : ''}\`);
        renderParentOverview();
        renderMonthlyReport();
        renderParentLog();
      };

      function renderParentLog() {
        // Collect all logs from all members (children only, exclude parent's own logs)
        const allLogs = [];
        for (const [name, m] of Object.entries(app.data.members)) {
          if (name === '家长') continue;
          (m.logs || []).forEach(l => {
            allLogs.push({ ...l, member: name });
          });
        }
        allLogs.sort((a, b) => b.timestamp - a.timestamp);

        const container = $('#parent-log');
        const empty = $('#parent-log-empty');

        if (allLogs.length === 0) {
          container.innerHTML = '';
          empty.style.display = 'block';
          return;
        }
        empty.style.display = 'none';

        // Group by month (newest first)
        const groups = {};
        // Sort chronologically for correct subtotal order, then reverse for display
        const chrono = [...allLogs].sort((a, b) => a.timestamp - b.timestamp);
        chrono.forEach(l => {
          const d = new Date(l.timestamp);
          const key = \`\${d.getFullYear()}-\${String(d.getMonth() + 1).padStart(2, '0')}\`;
          const label = \`\${d.getFullYear()}年\${d.getMonth() + 1}月\`;
          if (!groups[key]) groups[key] = { label, logs: [], subtotal: 0 };
          groups[key].logs.push(l);
          groups[key].subtotal += l.points;
        });

        const months = Object.keys(groups).sort().reverse();

        let html = '';
        months.forEach((key, mi) => {
          const g = groups[key];
          const subSign = g.subtotal >= 0 ? '+' : '';
          const subColor = g.subtotal >= 0 ? 'var(--green-dark)' : 'var(--red)';
          html += \`
            <div class="flex items-center justify-between px-1 py-2 mt-\${mi === 0 ? '0' : '3'}">
              <span class="text-xs font-bold" style="color:var(--text-secondary);">📅 \${g.label}</span>
              <span class="text-xs font-bold" style="color:\${subColor};">\${subSign}\${g.subtotal} 分</span>
            </div>
          \`;
          // Logs within month: newest first
          const monthLogs = [...g.logs].reverse();
          monthLogs.forEach(l => {
            const isPositive = l.points > 0;
            const whoText = l.by === '家长' && l.points < 0 ? '由家长扣除'
              : l.by === '家长' ? '由家长添加'
              : '自主完成';
            const emoji = isPositive ? '🏅' : '⚠️';
            html += \`
              <div class="log-entry">
                <div class="pts-badge" style="background:\${isPositive ? 'var(--green)' : 'var(--red)'};color:white;">
                  \${isPositive ? '+' : ''}\${l.points}
                </div>
                <div class="flex-1 min-w-0">
                  <div class="font-medium text-sm truncate">
                    \${getEmoji(l.member)} \${l.member} · \${emoji} \${l.action}
                  </div>
                  <div class="text-xs" style="color:var(--text-secondary);">
                    \${whoText}
                    \${l.note ? \`· \${l.note}\` : ''}
                  </div>
                </div>
                <div class="text-xs" style="color:var(--text-secondary);flex-shrink:0;">\${formatTime(l.timestamp)}</div>
              </div>
            \`;
          });
        });
        container.innerHTML = html;
      }

      // ----------------------------------------------------------------
      // ⑨ TASK EDITOR (Parent)
      // ----------------------------------------------------------------

      /** Get the current child's task list from the data store */
      function getTaskChildName() { return app.taskChild; }
      function getTaskListFor(child) { return app.data.members[child]?.tasks || []; }

      /** Highlight the active tab */
      function updateTaskTabs() {
        const kids = ['姐姐', '弟弟'];
        const colors = { '姐姐': { bg: 'var(--pink-bg)', text: 'var(--pink-dark)' }, '弟弟': { bg: 'var(--blue-bg)', text: 'var(--blue-dark)' } };
        const activeColors = { '姐姐': { bg: 'var(--pink-dark)', text: '#fff' }, '弟弟': { bg: 'var(--blue-dark)', text: '#fff' } };
        kids.forEach(name => {
          const btn = $(\`#task-tab-\${name}\`);
          if (!btn) return;
          const c = name === app.taskChild ? activeColors[name] : colors[name];
          btn.style.background = c.bg;
          btn.style.color = c.text;
        });
      }

      window.switchTaskChild = function (name) {
        app.taskChild = name;
        updateTaskTabs();
        renderTaskEditor();
      };

      function renderTaskEditor() {
        const container = $('#task-editor-list');
        const emojiOptions = ['📖','🧸','📝','🎹','🎨','🧹','🛏️','🥗','🚶','🏃','🧮','🔬','🌱','🧩','🎯','💪','🎤','📐','🪥','🧽','🛌','⏰','🛁','🥤','🍎','🎒','🗣️','🧘','🤸','📚','✏️','🖍️','🧴','🗂️','🥛','🍳','🧸'];
        const target = getTaskChildName();
        const tasks = getTaskListFor(target);

        container.innerHTML = tasks.map(t => {
          const ptsOpts = [1,2,3,5,8,10,15,20].map(v =>
            \`<option value="\${v}" \${v === t.points ? 'selected' : ''}>\${v}分</option>\`
          ).join('');
          return \`
            <div class="task-edit-item" data-task-id="\${t.id}">
              <select class="emoji-picker text-xl bg-transparent outline-none" style="width:40px;">
                \${emojiOptions.map(e => \`<option value="\${e}" \${e === t.icon ? 'selected' : ''}>\${e}</option>\`).join('')}
              </select>
              <input type="text" class="task-name flex-1 bg-transparent outline-none text-sm font-medium" value="\${t.name}" placeholder="任务名称">
              <select class="task-points text-sm bg-transparent outline-none">\${ptsOpts}</select>
              <button class="del-task text-lg px-1" style="color:var(--red);">✕</button>
            </div>
          \`;
        }).join('');

        // Empty state
        if (tasks.length === 0) {
          container.innerHTML = '<div class="text-center py-4 text-sm" style="color:var(--text-secondary);">还没有任务，点击下方添加 ➕</div>';
        }

        // Bind delete
        container.querySelectorAll('.del-task').forEach(btn => {
          btn.addEventListener('click', function () {
            const item = this.closest('.task-edit-item');
            const tid = item.dataset.taskId;
            const member = app.data.members[target];
            if (member) {
              member.tasks = member.tasks.filter(t => t.id !== tid);
              saveData();
              renderTaskEditor();
              showToast('已删除任务');
            }
          });
        });

        // Auto-save on change
        container.querySelectorAll('.task-name, .task-points, .emoji-picker').forEach(el => {
          el.addEventListener('change', saveTaskEdits);
          el.addEventListener('input', saveTaskEdits);
        });
      }

      function saveTaskEdits() {
        const target = getTaskChildName();
        const member = app.data.members[target];
        if (!member) return;
        const items = $$('#task-editor-list .task-edit-item');
        items.forEach(item => {
          const tid = item.dataset.taskId;
          const name = item.querySelector('.task-name').value.trim() || '任务';
          const points = parseInt(item.querySelector('.task-points').value) || 1;
          const icon = item.querySelector('.emoji-picker').value || '📌';
          const task = member.tasks.find(t => t.id === tid);
          if (task) {
            task.name = name;
            task.points = points;
            task.icon = icon;
          }
        });
        saveData();
      }

      window.addTaskRow = function () {
        const target = getTaskChildName();
        const member = app.data.members[target];
        if (!member) return;
        app.taskEditCounter++;
        const prefix = target === '姐姐' ? 't_' : 'd_';
        const newId = prefix + Date.now() + '_' + app.taskEditCounter;
        member.tasks.push({ id: newId, name: '新任务', points: 5, icon: '🎯' });
        saveData();
        renderTaskEditor();
        // Scroll to bottom
        const area = document.querySelector('#screen-parent .scroll-area');
        if (area) setTimeout(() => { area.scrollTop = area.scrollHeight; }, 50);
      };

      // ----------------------------------------------------------------
      // Goal settings (parent)
      // ----------------------------------------------------------------
      function renderGoalStatus() {
        var el = $('#goal-current-status');
        if (!el) return;
        var name = $('#goal-child') ? $('#goal-child').value : '姐姐';
        var m = app.data.members[name];
        if (m && m.goal && m.goal.target > 0) {
          el.innerHTML = '当前: ' + getEmoji(name) + ' ' + name + ' → ' + m.goal.target + '分「' + m.goal.label + '」';
        } else {
          el.innerHTML = '暂无目标';
        }
      }

      window.saveGoal = function () {
        var name = $('#goal-child').value;
        var target = parseInt($('#goal-target').value) || 0;
        var label = $('#goal-label').value.trim() || '攒积分';
        if (target <= 0) { showToast('请输入有效的目标分数'); return; }
        var m = app.data.members[name];
        m.goal = { target: target, label: label };
        saveData();
        renderGoalStatus();
        showToast('✅ 已为' + name + '设置目标「' + label + '」' + target + '分');
      };

      window.clearGoal = function () {
        var name = $('#goal-child').value;
        var m = app.data.members[name];
        m.goal = null;
        saveData();
        renderGoalStatus();
        showToast('已清除' + name + '的目标');
      };

      // ----------------------------------------------------------------
      // Export / Import data sync
      // ----------------------------------------------------------------
      window.exportData = function () {
        var json = JSON.stringify(app.data, null, 2);
        var blob = new Blob([json], { type: 'application/json' });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'hermes-family-points-' + new Date().toISOString().slice(0, 10) + '.json';
        a.click();
        URL.revokeObjectURL(a.href);
        showToast('✅ 数据已导出');
      };

      window.importData = function (e) {
        var file = e.target.files[0];
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function (ev) {
          try {
            var data = JSON.parse(ev.target.result);
            if (!data.members || !data.members['\\u59d0\\u59d0'] || !data.members['\\u5f1f\\u5f1f']) {
              showToast('\\u274c \\u6587\\u4ef6\\u683c\\u5f0f\\u4e0d\\u5bf9');
              return;
            }
            app.data = data;
            saveData();
            if (app.currentRole === '\\u5bb6\\u957f') renderParentDashboard();
            showToast('✅ 数据导入成功！');
          } catch (err) {
            showToast('\\u274c \\u6587\\u4ef6\\u89e3\\u6790\\u5931\\u8d25');
          }
        };
        reader.readAsText(file);
        e.target.value = '';
      };

      // ----------------------------------------------------------------
      // ⑩ LOGOUT
      // ----------------------------------------------------------------
      window.logout = function () {
        app.currentRole = null;
        switchScreen('screen-home');
        showToast('已退出');
      };

      // ----------------------------------------------------------------
      // ----------------------------------------------------------------
      // ⑫ Goal selector change
      // ----------------------------------------------------------------
      var goalChildSel = document.getElementById('goal-child');
      if (goalChildSel) {
        goalChildSel.addEventListener('change', renderGoalStatus);
      }

      // ----------------------------------------------------------------
      // ⑬ KEYBOARD SHORTCUT (parent: Enter to submit)
      // ----------------------------------------------------------------
      $('#parent-points-input').addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && app.currentRole === '家长') {
          parentAddPoints();
        }
      });
      $('#parent-note').addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && app.currentRole === '家长') {
          parentAddPoints();
        }
      });

      console.log('\\U0001f3c6 Hermes Family Points loaded.');
      console.log('\\U0001f4e6 Data:', app.data);
      console.log('\☁\️ CF KV:', CF.enabled ? 'ENABLED' : 'DISABLED (localStorage)');

      // Cloud sync: on load, merge cloud data (cloud wins over local)
      if (CF.enabled) {
        showToast('🔄 正在同步云端数据...', 2000);
        CF.fetchAll().then(function(cloudData) {
          if (cloudData && cloudData.members) {
            var localVersion = app.data.version || 0;
            var cloudVersion = cloudData.version || 0;
            // Cloud is newer or same → use cloud data
            if (cloudVersion >= localVersion) {
              // 防御性初始化：确保每个成员有完整的必要属性
              for (var _name in cloudData.members) {
                var _m = cloudData.members[_name];
                if (!_m.logs) _m.logs = [];
                if (!_m.tasks) _m.tasks = [];
                if (!_m.tasksDoneToday) _m.tasksDoneToday = [];
                if (!_m.tasksDoneDate) _m.tasksDoneDate = '';
                if (_m.goal === undefined) _m.goal = null;
                if (_m.points === undefined) _m.points = 0;
              }
              // 合并云端数据到现有对象，保持 app.data.members 引用不变！
              // 逐个属性合并，不替换 members 对象本身
              // 这样所有闭包中的 member 引用依然有效
              if (cloudData.version) app.data.version = cloudData.version;
              // 逐成员合并属性到现有成员对象
              for (var _cpName in cloudData.members) {
                var cloudMem = cloudData.members[_cpName];
                var localMem = app.data.members[_cpName];
                if (localMem && cloudMem) {
                  // 合并 cloudMem 的属性到 localMem，保持引用
                  for (var _cpKey in cloudMem) {
                    if (_cpKey === '_processing') continue; // 跳过死锁标记
                    localMem[_cpKey] = cloudMem[_cpKey];
                  }
                }
              }
              // 清除云端带来的 _processing 死锁标记
              delete app.data._processing;
              // 确保每个成员有默认任务（云端可能为空）
              for (var _n2 in DEFAULT_DATA.members) {
                var _m2 = app.data.members[_n2];
                if (_m2) {
                  if (!_m2.logs) _m2.logs = [];
                  if (!_m2.tasks || _m2.tasks.length === 0) {
                    _m2.tasks = JSON.parse(JSON.stringify(DEFAULT_DATA.members[_n2].tasks || []));
                  }
                  if (!_m2.tasksDoneToday) _m2.tasksDoneToday = [];
                  // 过滤无效的taskId（云端可能带了另一台设备的旧任务ID）
                  if (_m2.tasksDoneToday.length > 0) {
                    var validTasks = {};
                    for (var _vt = 0; _vt < (_m2.tasks || []).length; _vt++) {
                      validTasks[_m2.tasks[_vt].id] = true;
                    }
                    _m2.tasksDoneToday = _m2.tasksDoneToday.filter(function(tid) {
                      return !!validTasks[tid];
                    });
                  }
                  if (!_m2.tasksDoneDate) _m2.tasksDoneDate = '';
                  if (_m2.goal === undefined) _m2.goal = null;
                  if (_m2.points === undefined) _m2.points = 0;
                }
              }
              localStorage.setItem(STORAGE_KEY, JSON.stringify(app.data));
              console.log('\☁\️ Synced from cloud (v' + cloudVersion + ')');
              showToast('✅ 云端数据已同步', 1500);
            } else {
              // Local is newer → push local to cloud
              CF.saveAll(app.data);
              console.log('\☁\️ Pushed local data to cloud (v' + localVersion + ')');
            }
          } else {
            // No cloud data yet → push local
            CF.saveAll(app.data);
            console.log('\☁\️ Initial cloud sync');
          }
        }).catch(function() {
          console.log('\☁\️ Cloud unavailable, using localStorage');
        });
      }

    })();
  </script>

</body>
</html>`;

async function handleApi(request, env) {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  }
  if (request.method === 'GET') {
    const data = await env.FAMILY_POINTS.get('family_points_data', 'json');
    return new Response(JSON.stringify(data || null), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
  if (request.method === 'PUT') {
    try {
      const data = await request.json();
      await env.FAMILY_POINTS.put('family_points_data', JSON.stringify(data));
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }
  }
  return new Response('Method not allowed', { status: 405 });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === '/api/points') {
      return handleApi(request, env);
    }
    return new Response(HTML, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }
};
