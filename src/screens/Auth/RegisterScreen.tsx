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
import { AppHeader } from '../../components/common/AppHeader';
import { RegisterRequest } from '../../types/auth';
import {
  ValidationMessages,
  isValidEmail,
  isValidPhone,
  isValidName,
  isValidPassword,
} from '../../utils/validators';

export const RegisterScreen: React.FC = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterRequest>({
    defaultValues: { name: '', email: '', phone: '', password: '', confirmPassword: '' },
  });

  const password = watch('password');

  const onSubmit = async (_data: RegisterRequest) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsLoading(false);
    router.replace('/auth/login');
  };

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <AppHeader title="Create Account" onBack={() => router.back()} />
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingBottom: insets.bottom + Spacing[6] },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
          Fill in the details below to get started
        </Text>

        <View style={[styles.formCard, { backgroundColor: theme.colors.surface }]}>
          <Controller
            control={control}
            name="name"
            rules={{
              required: ValidationMessages.required,
              validate: (v) => isValidName(v) || ValidationMessages.name,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <AppTextField
                label="Full Name"
                placeholder="Enter your full name"
                autoCapitalize="words"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.name?.message}
              />
            )}
          />

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
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="phone"
            rules={{
              required: ValidationMessages.required,
              validate: (v) => isValidPhone(v) || ValidationMessages.phone,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <AppTextField
                label="Mobile Number"
                placeholder="Enter 10-digit mobile number"
                keyboardType="phone-pad"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.phone?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{
              required: ValidationMessages.required,
              validate: (v) => isValidPassword(v) || ValidationMessages.password,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <PasswordField
                label="Password"
                placeholder="Create a strong password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: ValidationMessages.required,
              validate: (v) => v === password || ValidationMessages.passwordMatch,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <PasswordField
                label="Confirm Password"
                placeholder="Re-enter your password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.confirmPassword?.message}
              />
            )}
          />

          <PrimaryButton
            title="Create Account"
            onPress={handleSubmit(onSubmit)}
            isLoading={isLoading}
            style={styles.submitButton}
          />
        </View>

        <View style={styles.loginRow}>
          <Text style={[styles.loginText, { color: theme.colors.onSurfaceVariant }]}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={[styles.loginLink, { color: theme.colors.primary }]}>Sign In</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.terms, { color: theme.colors.placeholder }]}>
          By creating an account, you agree to our{' '}
          <Text style={{ color: theme.colors.primary }}>Terms of Service</Text> and{' '}
          <Text style={{ color: theme.colors.primary }}>Privacy Policy</Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flexGrow: 1,
    paddingHorizontal: Spacing[6],
    paddingTop: Spacing[4],
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginBottom: Spacing[5],
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
  submitButton: {
    width: '100%',
    paddingVertical: Spacing[4],
    marginTop: Spacing[2],
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing[6],
  },
  loginText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  loginLink: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
  terms: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    textAlign: 'center',
    marginTop: Spacing[5],
    lineHeight: 18,
  },
});
