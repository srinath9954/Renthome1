import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { router } from 'expo-router';
import { useTheme } from '../../hooks/useTheme';
import { Spacing, BorderRadius } from '../../theme/spacing';
import { AppTextField } from '../../components/common/AppTextField';
import { PasswordField } from '../../components/common/PasswordField';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { authService } from '../../services/auth/authService';
import { LoginRequest } from '../../types/auth';
import { ValidationMessages, isValidEmail } from '../../utils/validators';

export const LoginScreen: React.FC = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginRequest) => {
    setServerError('');
    setIsLoading(true);
    try {
      await authService.login(data.email, data.password);
      // onAuthStateChanged in _layout.tsx will update the store and the
      // index route will redirect to home automatically.
      router.replace('/(tabs)/home');
    } catch (err: any) {
      const code: string = err?.code ?? '';
      if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        setServerError('Invalid email or password. Please try again.');
      } else if (code === 'auth/too-many-requests') {
        setServerError('Too many failed attempts. Please try again later.');
      } else {
        setServerError('Sign in failed. Please check your connection and try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingTop: insets.top + Spacing[8], paddingBottom: insets.bottom + Spacing[6] },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.logoContainer, { backgroundColor: theme.colors.primary }]}>
            <Text style={[styles.logoText, { color: theme.colors.onPrimary }]}>NB</Text>
          </View>
          <Text style={[styles.appName, { color: theme.colors.primary }]}>NoBroker</Text>
          <Text style={[styles.tagline, { color: theme.colors.onSurfaceVariant }]}>
            Find your perfect home without brokerage
          </Text>
        </View>

        {/* Form card */}
        <View style={[styles.formCard, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.formTitle, { color: theme.colors.onSurface }]}>
            Welcome Back
          </Text>
          <Text style={[styles.formSubtitle, { color: theme.colors.onSurfaceVariant }]}>
            Sign in to your account
          </Text>

          {serverError !== '' && (
            <View style={[styles.errorBanner, { backgroundColor: theme.colors.error + '18' }]}>
              <Text style={[styles.errorBannerText, { color: theme.colors.error }]}>
                {serverError}
              </Text>
            </View>
          )}

          <Controller
            control={control}
            name="email"
            rules={{
              required: ValidationMessages.required,
              validate: (v) => isValidEmail(v) || ValidationMessages.email,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <AppTextField
                label="Email Address"
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{ required: ValidationMessages.required }}
            render={({ field: { onChange, onBlur, value } }) => (
              <PasswordField
                label="Password"
                placeholder="Enter your password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.password?.message}
              />
            )}
          />

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => router.push('/auth/forgot-password')}
          >
            <Text style={[styles.forgotPasswordText, { color: theme.colors.primary }]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <PrimaryButton
            title="Sign In"
            onPress={handleSubmit(onSubmit)}
            isLoading={isLoading}
            style={styles.signInButton}
          />
        </View>

        <View style={styles.registerRow}>
          <Text style={[styles.registerText, { color: theme.colors.onSurfaceVariant }]}>
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.push('/auth/register')}>
            <Text style={[styles.registerLink, { color: theme.colors.primary }]}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flexGrow: 1,
    paddingHorizontal: Spacing[6],
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing[8],
  },
  logoContainer: {
    width: 72,
    height: 72,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing[3],
  },
  logoText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
  },
  appName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    marginBottom: Spacing[1],
  },
  tagline: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    textAlign: 'center',
  },
  formCard: {
    borderRadius: BorderRadius['2xl'],
    padding: Spacing[6],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  formTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    marginBottom: Spacing[1],
  },
  formSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginBottom: Spacing[4],
  },
  errorBanner: {
    borderRadius: BorderRadius.md,
    padding: Spacing[3],
    marginBottom: Spacing[4],
  },
  errorBannerText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: -Spacing[2],
    marginBottom: Spacing[5],
  },
  forgotPasswordText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
  },
  signInButton: {
    width: '100%',
    paddingVertical: Spacing[4],
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing[6],
  },
  registerText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  registerLink: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
});
