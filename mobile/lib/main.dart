import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:webview_flutter_android/webview_flutter_android.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Set edge-to-edge system navigation & status bar colors matching the app theme (#020617)
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.light,
      statusBarBrightness: Brightness.dark,
      systemNavigationBarColor: Color(0xFF020617),
      systemNavigationBarIconBrightness: Brightness.light,
      systemNavigationBarDividerColor: Colors.transparent,
    ),
  );

  runApp(const MarketMindApp());
}

class MarketMindApp extends StatelessWidget {
  const MarketMindApp({super.key});

  static const String appUrl = 'https://marketmind-ai-bhargavi-2026.onrender.com/';

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'MarketMind AI',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: const Color(0xFF020617),
        colorScheme: const ColorScheme.dark(
          primary: Color(0xFF6366F1), // Indigo 500
          secondary: Color(0xFF06B6D4), // Cyan 500
          surface: Color(0xFF0F172A), // Slate 900
        ),
        useMaterial3: true,
      ),
      home: const MarketMindWebViewScreen(initialUrl: appUrl),
    );
  }
}

class MarketMindWebViewScreen extends StatefulWidget {
  final String initialUrl;
  const MarketMindWebViewScreen({super.key, required this.initialUrl});

  @override
  State<MarketMindWebViewScreen> createState() => _MarketMindWebViewScreenState();
}

class _MarketMindWebViewScreenState extends State<MarketMindWebViewScreen> {
  late final WebViewController _controller;
  int _loadingProgress = 0;
  bool _isLoading = true;
  bool _hasError = false;
  String _errorMessage = '';
  DateTime? _lastBackPressed;

  @override
  void initState() {
    super.initState();
    _initWebViewController();
  }

  void _initWebViewController() {
    late final PlatformWebViewControllerCreationParams params;
    if (WebViewPlatform.instance is AndroidWebViewPlatform) {
      params = AndroidWebViewControllerCreationParams();
    } else {
      params = const PlatformWebViewControllerCreationParams();
    }

    final WebViewController controller =
        WebViewController.fromPlatformCreationParams(
      params,
      onPermissionRequest: (request) {
        request.grant();
      },
    );

    controller
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(const Color(0xFF020617))
      ..setNavigationDelegate(
        NavigationDelegate(
          onProgress: (int progress) {
            setState(() {
              _loadingProgress = progress;
            });
          },
          onPageStarted: (String url) {
            setState(() {
              _isLoading = true;
              _hasError = false;
            });
          },
          onPageFinished: (String url) {
            setState(() {
              _isLoading = false;
              _loadingProgress = 100;
            });
            _injectMobileOptimizer(controller);
          },
          onWebResourceError: (WebResourceError error) {
            // Only trigger full error page for main frame network failures
            if (error.isForMainFrame ?? true) {
              setState(() {
                _hasError = true;
                _isLoading = false;
                _errorMessage = error.description;
              });
            }
          },
          onNavigationRequest: (NavigationRequest request) async {
            final uri = Uri.parse(request.url);
            
            // Allow primary domain and OAuth/AI endpoints
            if (uri.host.contains('onrender.com') ||
                uri.host.contains('localhost') ||
                uri.host.contains('google.com') ||
                uri.host.contains('googleapis.com')) {
              return NavigationDecision.navigate;
            }

            // Open tel/mailto/external URLs in device native apps
            if (request.url.startsWith('tel:') ||
                request.url.startsWith('mailto:') ||
                request.url.startsWith('sms:')) {
              if (await canLaunchUrl(uri)) {
                await launchUrl(uri);
              }
              return NavigationDecision.prevent;
            }

            // Open external links outside Render deployment in external browser
            if (uri.scheme == 'http' || uri.scheme == 'https') {
              if (await canLaunchUrl(uri)) {
                await launchUrl(uri, mode: LaunchMode.externalApplication);
                return NavigationDecision.prevent;
              }
            }

            return NavigationDecision.navigate;
          },
        ),
      )
      ..loadRequest(Uri.parse(widget.initialUrl));

    // Android-specific hardware acceleration & optimization settings
    if (controller.platform is AndroidWebViewController) {
      final androidController = controller.platform as AndroidWebViewController;
      AndroidWebViewController.enableDebugging(kDebugMode);
      androidController.setMediaPlaybackRequiresUserGesture(false);
    }

    _controller = controller;
  }

  Future<void> _handleRefresh() async {
    setState(() {
      _hasError = false;
      _isLoading = true;
    });
    await _controller.reload();
  }

  void _injectMobileOptimizer(WebViewController controller) {
    const String mobileScript = r'''
(function() {
  try {
    // 1. Force mobile-friendly viewport meta tag
    var meta = document.querySelector('meta[name="viewport"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'viewport';
      document.head.appendChild(meta);
    }
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';

    // 2. Inject mobile responsive stylesheet overrides
    var styleId = 'marketmind-mobile-optimizer-css';
    if (!document.getElementById(styleId)) {
      var style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `
        @media screen and (max-width: 1024px) {
          /* Transform static desktop sidebar into off-canvas drawer */
          aside {
            position: fixed !important;
            top: 0 !important;
            bottom: 0 !important;
            left: 0 !important;
            height: 100vh !important;
            width: 280px !important;
            max-width: 82vw !important;
            z-index: 99999 !important;
            transform: translateX(-105%) !important;
            transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1) !important;
            box-shadow: 0 0 35px rgba(0, 0, 0, 0.85) !important;
            background: #090d16 !important;
          }

          aside.marketmind-drawer-open {
            transform: translateX(0) !important;
          }

          /* Main content area gets 100% full phone width */
          main {
            width: 100% !important;
            max-width: 100vw !important;
            min-width: 0 !important;
            flex: 1 1 100% !important;
            padding: 12px 12px 96px 12px !important;
            overflow-x: hidden !important;
            -webkit-overflow-scrolling: touch !important;
          }

          /* Prevent 4-column metric cards from squishing into columns */
          .grid-cols-4, .lg\\:grid-cols-4, [class*="grid-cols-4"] {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 10px !important;
          }

          /* Prevent text collision in cards */
          .grid > div {
            padding: 12px 10px !important;
            min-width: 0 !important;
          }

          /* Banner and input responsive full width */
          .max-w-4xl {
            max-width: 100% !important;
          }

          .truncate.max-w-xs {
            max-width: 100% !important;
            white-space: normal !important;
            text-align: left !important;
          }

          /* Header compact layout */
          header {
            padding-left: 10px !important;
            padding-right: 10px !important;
          }

          /* Modals responsive */
          .fixed.inset-0 > div {
            max-width: 95vw !important;
            max-height: 88vh !important;
            overflow-y: auto !important;
            margin: auto !important;
            padding: 16px !important;
          }
        }
      `;
      document.head.appendChild(style);
    }

    // 3. Create backdrop for drawer
    var backdrop = document.getElementById('marketmind-mobile-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'marketmind-mobile-backdrop';
      backdrop.style.cssText = 'display:none; position:fixed; inset:0; background:rgba(0,0,0,0.7); backdrop-filter:blur(4px); z-index:99990;';
      document.body.appendChild(backdrop);
    }

    var aside = document.querySelector('aside');
    if (aside) {
      backdrop.onclick = function() {
        aside.classList.remove('marketmind-drawer-open');
        backdrop.style.display = 'none';
      };

      // Automatically close drawer when any navigation item inside aside is tapped
      var buttons = aside.querySelectorAll('button');
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
          aside.classList.remove('marketmind-drawer-open');
          backdrop.style.display = 'none';
        });
      }
    }

    // 4. Inject mobile Floating Menu Button if header button is not present
    if (!document.getElementById('marketmind-mobile-menu-btn')) {
      var btn = document.createElement('button');
      btn.id = 'marketmind-mobile-menu-btn';
      btn.innerHTML = '&#9776;';
      btn.title = 'Open Menu';
      btn.style.cssText = 'position:fixed; bottom:20px; right:20px; width:52px; height:52px; border-radius:50%; background:linear-gradient(135deg, #6366f1, #06b6d4); color:#fff; font-size:24px; display:flex; align-items:center; justify-content:center; border:none; box-shadow:0 6px 20px rgba(99,102,241,0.5); z-index:99980; cursor:pointer;';
      
      var checkDisplay = function() {
        if (window.innerWidth <= 1024) {
          btn.style.display = 'flex';
        } else {
          btn.style.display = 'none';
        }
      };
      checkDisplay();
      window.addEventListener('resize', checkDisplay);

      btn.onclick = function() {
        if (aside) {
          var isOpen = aside.classList.toggle('marketmind-drawer-open');
          backdrop.style.display = isOpen ? 'block' : 'none';
        }
      };
      document.body.appendChild(btn);
    }
  } catch(e) {
    console.error('Error applying mobile layout fixes:', e);
  }
})();
''';
    controller.runJavaScript(mobileScript);
  }

  void _handleBackPress() async {
    if (await _controller.canGoBack()) {
      await _controller.goBack();
      return;
    }

    // Double tap to exit within 2 seconds
    final now = DateTime.now();
    if (_lastBackPressed == null ||
        now.difference(_lastBackPressed!) > const Duration(seconds: 2)) {
      _lastBackPressed = now;
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: const Text(
              'Press back again to exit MarketMind AI',
              style: TextStyle(color: Colors.white, fontSize: 13),
            ),
            duration: const Duration(seconds: 2),
            backgroundColor: const Color(0xFF1E293B),
            behavior: SnackBarBehavior.floating,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(10),
            ),
          ),
        );
      }
      return;
    }

    // Exit application
    SystemNavigator.pop();
  }

  @override
  Widget build(BuildContext context) {
    return PopScope(
      canPop: false,
      onPopInvokedWithResult: (didPop, result) {
        if (didPop) return;
        _handleBackPress();
      },
      child: Scaffold(
        backgroundColor: const Color(0xFF020617),
        body: SafeArea(
          top: true,
          bottom: false,
          child: Stack(
            children: [
              // 1. Primary WebView
              if (!_hasError)
                RefreshIndicator(
                  color: const Color(0xFF6366F1),
                  backgroundColor: const Color(0xFF0F172A),
                  onRefresh: _handleRefresh,
                  child: WebViewWidget(controller: _controller),
                ),

              // 2. High-speed Animated Gradient Loading Bar
              if (_isLoading && _loadingProgress < 100)
                Positioned(
                  top: 0,
                  left: 0,
                  right: 0,
                  child: SizedBox(
                    height: 3,
                    child: LinearProgressIndicator(
                      value: _loadingProgress / 100.0,
                      backgroundColor: Colors.transparent,
                      valueColor: const AlwaysStoppedAnimation<Color>(
                        Color(0xFF6366F1),
                      ),
                    ),
                  ),
                ),

              // 3. Initial Cold-Start Splash / Loading Overlay
              if (_isLoading && _loadingProgress < 60 && !_hasError)
                Container(
                  color: const Color(0xFF020617),
                  child: Center(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Container(
                          width: 72,
                          height: 72,
                          decoration: BoxDecoration(
                            gradient: const LinearGradient(
                              colors: [Color(0xFF6366F1), Color(0xFF06B6D4)],
                              begin: Alignment.topLeft,
                              end: Alignment.bottomRight,
                            ),
                            borderRadius: BorderRadius.circular(20),
                            boxShadow: [
                              BoxShadow(
                                color: const Color(0xFF6366F1).withValues(alpha: 0.35),
                                blurRadius: 24,
                                spreadRadius: 4,
                              ),
                            ],
                          ),
                          child: const Icon(
                            Icons.auto_awesome,
                            color: Colors.white,
                            size: 38,
                          ),
                        ),
                        const SizedBox(height: 24),
                        const Text(
                          'MarketMind AI',
                          style: TextStyle(
                            fontSize: 22,
                            fontWeight: FontWeight.bold,
                            letterSpacing: 0.5,
                            color: Colors.white,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          'Autonomous Marketing Workspace',
                          style: TextStyle(
                            fontSize: 13,
                            color: Color(0xFF94A3B8),
                          ),
                        ),
                        const SizedBox(height: 32),
                        const SizedBox(
                          width: 28,
                          height: 28,
                          child: CircularProgressIndicator(
                            strokeWidth: 2.5,
                            valueColor: AlwaysStoppedAnimation<Color>(
                              Color(0xFF6366F1),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),

              // 4. Offline & Connection Error Fallback
              if (_hasError)
                Container(
                  color: const Color(0xFF020617),
                  padding: const EdgeInsets.symmetric(horizontal: 32),
                  child: Center(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Container(
                          padding: const EdgeInsets.all(20),
                          decoration: BoxDecoration(
                            color: const Color(0xFF0F172A),
                            shape: BoxShape.circle,
                            border: Border.all(
                              color: Colors.redAccent.withValues(alpha: 0.3),
                              width: 1.5,
                            ),
                          ),
                          child: const Icon(
                            Icons.wifi_off_rounded,
                            size: 48,
                            color: Colors.redAccent,
                          ),
                        ),
                        const SizedBox(height: 24),
                        const Text(
                          'Connection Issue',
                          style: TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                        const SizedBox(height: 12),
                        Text(
                          _errorMessage.isNotEmpty
                              ? 'Unable to connect to MarketMind AI servers ($_errorMessage).\nPlease check your internet connection.'
                              : 'Unable to reach the MarketMind AI server. Render free instances may be waking up.',
                          textAlign: TextAlign.center,
                          style: const TextStyle(
                            fontSize: 14,
                            color: Color(0xFF94A3B8),
                            height: 1.4,
                          ),
                        ),
                        const SizedBox(height: 28),
                        ElevatedButton.icon(
                          onPressed: _handleRefresh,
                          icon: const Icon(Icons.refresh_rounded, size: 20),
                          label: const Text(
                            'Retry Connection',
                            style: TextStyle(
                              fontSize: 15,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFF6366F1),
                            foregroundColor: Colors.white,
                            padding: const EdgeInsets.symmetric(
                              horizontal: 28,
                              vertical: 14,
                            ),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(12),
                            ),
                            elevation: 4,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}

